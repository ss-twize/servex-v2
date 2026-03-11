import { NextRequest, NextResponse } from "next/server";
import {
  generateCode,
  normalizePhone,
  validatePhone,
  validateTelegram,
  createBooking,
  getBookingByCode,
  confirmBooking,
} from "@/lib/booking";

// ── POST /api/bookings — create pending booking ──────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, business, telegram, email, date, time } = body ?? {};

    if (!name?.trim())     return NextResponse.json({ error: "Укажите имя" },             { status: 400 });
    if (!business?.trim()) return NextResponse.json({ error: "Укажите название бизнеса" }, { status: 400 });
    if (!phone?.trim())    return NextResponse.json({ error: "Укажите телефон" },           { status: 400 });

    if (!validatePhone(phone)) {
      return NextResponse.json({ error: "Неверный формат телефона" }, { status: 400 });
    }

    if (telegram && !validateTelegram(telegram)) {
      return NextResponse.json({ error: "Неверный формат Telegram" }, { status: 400 });
    }

    const code = generateCode();

    const booking = createBooking({
      code,
      name:     name.trim(),
      phone:    normalizePhone(phone),
      business: business.trim(),
      telegram: telegram?.trim().replace(/^@/, "") || null,
      email:    email?.trim()    || null,
      date:     date  ?? "",
      time:     time  ?? "",
    });

    // Fire-and-forget webhook to n8n (pending)
    const webhookUrl = process.env.BOOKING_WEBHOOK_URL;
    if (webhookUrl) {
      fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: "booking.pending", ...booking }),
      }).catch(() => {});
    }

    return NextResponse.json({ code, status: "pending" });
  } catch {
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}

// ── GET /api/bookings?code=SVX-XXXX — fetch booking by code ─────────────────
export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get("code");
  if (!code) return NextResponse.json({ error: "Укажите код" }, { status: 400 });

  const booking = getBookingByCode(code);
  if (!booking) return NextResponse.json({ error: "not_found" }, { status: 404 });

  return NextResponse.json(booking);
}

// ── PATCH /api/bookings — confirm booking (called by Telegram bot / n8n) ────
export async function PATCH(req: NextRequest) {
  try {
    const { code, telegramUserId } = (await req.json()) ?? {};

    if (!code) return NextResponse.json({ error: "Укажите код" }, { status: 400 });

    const existing = getBookingByCode(code);
    if (!existing) {
      return NextResponse.json({ error: "not_found" }, { status: 404 });
    }
    if (existing.status === "confirmed") {
      return NextResponse.json({ error: "already_confirmed" }, { status: 409 });
    }

    const confirmed = confirmBooking(code, telegramUserId ?? undefined);

    // Fire-and-forget: trigger confirmed-booking automation in n8n
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
