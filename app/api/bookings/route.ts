import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import {
  generateCode,
  normalizePhone,
  validatePhone,
  validateTelegram,
  createBooking,
  getBookingByCode,
  confirmBooking,
} from "@/lib/booking";

// Service-role client for server-side writes (bypasses RLS)
function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
    ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
  return createClient(url, key);
}

// ── POST /api/bookings ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, business, telegram, email, date, date_iso, time } = body ?? {};

    if (!name?.trim())     return NextResponse.json({ error: "Укажите имя" },             { status: 400 });
    if (!business?.trim()) return NextResponse.json({ error: "Укажите название бизнеса" }, { status: 400 });
    if (!phone?.trim())    return NextResponse.json({ error: "Укажите телефон" },           { status: 400 });
    if (!validatePhone(phone))
      return NextResponse.json({ error: "Неверный формат телефона" }, { status: 400 });
    if (telegram && !validateTelegram(telegram))
      return NextResponse.json({ error: "Неверный формат Telegram" }, { status: 400 });

    const db   = getServiceClient();
    const code = generateCode();

    // 1. Mark the slot as booked in Supabase (if slot exists)
    if (date_iso && time) {
      const { error: slotErr } = await db
        .from("demo_slots")
        .update({ is_booked: true })
        .eq("slot_date", date_iso)
        .eq("slot_time", time)
        .eq("is_booked", false);   // optimistic lock — only if still free

      if (slotErr) {
        return NextResponse.json({ error: "Это время уже занято. Выберите другое." }, { status: 409 });
      }
    }

    // 2. Persist booking to Supabase
    await db.from("demo_bookings").insert({
      code,
      name:     name.trim(),
      phone:    normalizePhone(phone),
      business: business.trim(),
      telegram: telegram?.trim().replace(/^@/, "") || null,
      email:    email?.trim() || null,
      slot_date: date_iso ?? null,
      slot_time: time     ?? null,
      date_label: date    ?? "",
      status: "pending",
    });

    // 3. Keep in-memory store for same-process PATCH
    createBooking({
      code,
      name:     name.trim(),
      phone:    normalizePhone(phone),
      business: business.trim(),
      telegram: telegram?.trim().replace(/^@/, "") || null,
      email:    email?.trim() || null,
      date:     date     ?? "",
      time:     time     ?? "",
    });

    // 4. Fire-and-forget to n8n
    const webhookUrl = process.env.BOOKING_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "booking.pending", code, name, phone, business, date, time }),
      }).catch(() => {});
    }

    return NextResponse.json({ code, status: "pending" });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// ── GET /api/bookings?code=SVX-XXXX ──────────────────────────────────────────
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) return NextResponse.json({ error: "Укажите код" }, { status: 400 });

  // Try in-memory first, fall back to Supabase
  const mem = getBookingByCode(code);
  if (mem) return NextResponse.json(mem);

  const { data } = await getServiceClient()
    .from("demo_bookings").select("*").eq("code", code).single();
  if (!data) return NextResponse.json({ error: "not_found" }, { status: 404 });
  return NextResponse.json(data);
}

// ── PATCH /api/bookings — confirm ─────────────────────────────────────────────
export async function PATCH(req: NextRequest) {
  try {
    const { code, telegramUserId } = (await req.json()) ?? {};
    if (!code) return NextResponse.json({ error: "Укажите код" }, { status: 400 });

    const db = getServiceClient();
    const { data: row } = await db
      .from("demo_bookings").select("*").eq("code", code).single();

    if (!row)               return NextResponse.json({ error: "not_found" },        { status: 404 });
    if (row.status === "confirmed")
                            return NextResponse.json({ error: "already_confirmed" }, { status: 409 });

    await db.from("demo_bookings")
      .update({ status: "confirmed", telegram_user_id: telegramUserId ?? null })
      .eq("code", code);

    const confirmed = { ...row, status: "confirmed" };

    // Also update in-memory
    confirmBooking(code, telegramUserId);

    const automationUrl = process.env.BOOKING_CONFIRMED_WEBHOOK_URL;
    if (automationUrl) {
      fetch(automationUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "booking.confirmed", ...confirmed }),
      }).catch(() => {});
    }

    return NextResponse.json(confirmed);
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
