"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getSupabase, DemoSlot } from "@/lib/supabase";
import { validatePhone, validateTelegram } from "@/lib/booking";

// ── Constants ──────────────────────────────────────────────────────────────
const MONTH_NAMES_GEN = [
  "января","февраля","марта","апреля","мая","июня",
  "июля","августа","сентября","октября","ноября","декабря",
];
const MONTH_NAMES_NOM = [
  "Январь","Февраль","Март","Апрель","Май","Июнь",
  "Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",
];
const DAY_ABBR = ["Пн","Вт","Ср","Чт","Пт","Сб","Вс"];

const CONFIRM_CONTACT =
  process.env.NEXT_PUBLIC_TELEGRAM_CONTACT || "ss_bizness";

// ── Helpers ────────────────────────────────────────────────────────────────
function toYMD(date: Date): string {
  return date.toISOString().slice(0, 10);
}
function today(): string {
  return toYMD(new Date());
}
function formatDateFull(date: Date): string {
  return `${date.getDate()} ${MONTH_NAMES_GEN[date.getMonth()]}`;
}
/** Mon=0 … Sun=6 */
function weekdayIndex(date: Date): number {
  return (date.getDay() + 6) % 7;
}

// ── UI helpers ─────────────────────────────────────────────────────────────
const inputBase =
  "w-full bg-sx-deep border rounded-lg px-4 py-3 text-sx-cream placeholder:text-sx-muted focus:outline-none transition-colors text-sm";
const inputNormal = `${inputBase} border-sx-border focus:border-sx-accent`;
const inputErr    = `${inputBase} border-sx-hot/60 focus:border-sx-hot`;

function TelegramIcon({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 15.7" />
    </svg>
  );
}

// ── Types ──────────────────────────────────────────────────────────────────
type FormData = { name: string; phone: string; business: string; telegram: string; email: string };
type FormErrors = Partial<Record<keyof FormData, string>>;

// ── Component ──────────────────────────────────────────────────────────────
export default function CalendarWidget({ onClose }: { onClose: () => void }) {
  // Navigation
  const now = new Date();
  const [viewYear,  setViewYear]  = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth()); // 0-based

  // Supabase slots: Map<"YYYY-MM-DD", Set<"HH:MM">>
  const [availableSlots, setAvailableSlots] = useState<Map<string, Set<string>>>(new Map());
  const [slotsLoading,   setSlotsLoading]   = useState(true);

  // Booking state
  const [step,         setStep]         = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form,         setForm]         = useState<FormData>({ name:"", phone:"", business:"", telegram:"", email:"" });
  const [errors,       setErrors]       = useState<FormErrors>({});
  const [submitError,  setSubmitError]  = useState("");
  const [loading,      setLoading]      = useState(false);
  const [confirmCode,  setConfirmCode]  = useState("");

  // ── Fetch slots for visible month (+ next for nav) ────────────────────────
  const fetchSlots = useCallback(async (year: number, month: number) => {
    setSlotsLoading(true);
    const db = getSupabase();
    if (!db) { setSlotsLoading(false); return; }

    const from = `${year}-${String(month + 1).padStart(2, "0")}-01`;
    const lastDay = new Date(year, month + 1, 0).getDate();
    const to   = `${year}-${String(month + 1).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;

    const { data, error } = await db
      .from("demo_slots")
      .select("slot_date, slot_time, is_booked")
      .gte("slot_date", from)
      .lte("slot_date", to)
      .eq("is_booked", false)
      .order("slot_time");

    if (!error && data) {
      const map = new Map<string, Set<string>>();
      (data as Pick<DemoSlot, "slot_date" | "slot_time" | "is_booked">[]).forEach((s) => {
        if (!map.has(s.slot_date)) map.set(s.slot_date, new Set());
        map.get(s.slot_date)!.add(s.slot_time);
      });
      setAvailableSlots(map);
    }
    setSlotsLoading(false);
  }, []);

  // initial fetch
  useEffect(() => { fetchSlots(viewYear, viewMonth); }, [viewYear, viewMonth, fetchSlots]);

  // realtime subscription
  useEffect(() => {
    const db = getSupabase();
    if (!db) return;
    const channel = db
      .channel("demo_slots_realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "demo_slots" }, () => {
        fetchSlots(viewYear, viewMonth);
      })
      .subscribe();
    return () => { db.removeChannel(channel); };
  }, [viewYear, viewMonth, fetchSlots]);

  // ── Calendar geometry ─────────────────────────────────────────────────────
  const todayStr = today();

  function buildMonthDays(): Array<{ date: Date | null; ymd: string | null }> {
    const firstDay  = new Date(viewYear, viewMonth, 1);
    const totalDays = new Date(viewYear, viewMonth + 1, 0).getDate();
    const offset    = weekdayIndex(firstDay); // Mon=0

    const cells: Array<{ date: Date | null; ymd: string | null }> = [];
    for (let i = 0; i < offset; i++) cells.push({ date: null, ymd: null });
    for (let d = 1; d <= totalDays; d++) {
      const date = new Date(viewYear, viewMonth, d);
      cells.push({ date, ymd: toYMD(date) });
    }
    return cells;
  }

  const monthDays = buildMonthDays();

  function isDayDisabled(ymd: string): boolean {
    if (ymd < todayStr) return true;
    return !availableSlots.has(ymd) || availableSlots.get(ymd)!.size === 0;
  }

  // Month navigation
  function prevMonth() {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0); }
    else setViewMonth(m => m + 1);
  }

  // Can't go earlier than current month
  const canGoPrev = viewYear > now.getFullYear() || viewMonth > now.getMonth();

  // ── Times for selected date ───────────────────────────────────────────────
  const timesForDay: string[] = selectedDate
    ? Array.from(availableSlots.get(toYMD(selectedDate)) ?? []).sort()
    : [];

  // ── Validation ────────────────────────────────────────────────────────────
  function validateForm(): FormErrors {
    const e: FormErrors = {};
    if (!form.name.trim())     e.name     = "Введите имя";
    if (!form.business.trim()) e.business = "Введите название бизнеса";
    if (!form.phone.trim())    e.phone    = "Введите телефон";
    else if (!validatePhone(form.phone)) e.phone = "Неверный формат телефона";
    if (form.telegram && !validateTelegram(form.telegram))
      e.telegram = "Неверный формат (от 5 символов, только буквы, цифры, _)";
    return e;
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  async function handleSubmit() {
    const errs = validateForm();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setLoading(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:     form.name.trim(),
          phone:    form.phone.trim(),
          business: form.business.trim(),
          telegram: form.telegram.trim() || null,
          email:    form.email.trim()    || null,
          date:     selectedDate ? formatDateFull(selectedDate) : "",
          date_iso: selectedDate ? toYMD(selectedDate) : "",
          time:     selectedTime,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setSubmitError(data.error ?? "Ошибка при отправке. Попробуйте ещё раз."); return; }
      setConfirmCode(data.code);
      setStep(4);
    } catch {
      setSubmitError("Нет соединения. Проверьте интернет и попробуйте снова.");
    } finally {
      setLoading(false);
    }
  }

  function updateField(field: keyof FormData, value: string) {
    setForm(p => ({ ...p, [field]: value }));
    if (errors[field]) setErrors(p => ({ ...p, [field]: undefined }));
    setSubmitError("");
  }

  const tgMessage = `Подтверждаю запись на демо\nКод: ${confirmCode}`;
  const tgUrl = `https://t.me/${CONFIRM_CONTACT}?text=${encodeURIComponent(tgMessage)}`;

  const slideVariants = {
    enter:  { opacity: 0, x: 40  },
    center: { opacity: 1, x: 0   },
    exit:   { opacity: 0, x: -40 },
  };

  return (
    <div className="min-h-[380px] flex flex-col">
      <AnimatePresence mode="wait">

        {/* ── Step 1: Month calendar ────────────────────────────────────────── */}
        {step === 1 && (
          <motion.div key="step1" variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.25 }} className="flex flex-col flex-1"
          >
            {/* Month header */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-sx-muted text-sm">Выберите дату</p>
              <div className="flex items-center gap-2">
                <button
                  onClick={prevMonth}
                  disabled={!canGoPrev}
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    canGoPrev
                      ? "text-sx-secondary hover:text-sx-cream hover:bg-sx-surface cursor-pointer"
                      : "text-sx-border cursor-not-allowed"
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <span className="font-heading font-semibold text-sx-cream text-sm min-w-[120px] text-center">
                  {MONTH_NAMES_NOM[viewMonth]} {viewYear}
                </span>
                <button
                  onClick={nextMonth}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-sx-secondary hover:text-sx-cream hover:bg-sx-surface transition-colors cursor-pointer"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Day names header */}
            <div className="grid grid-cols-7 mb-1">
              {DAY_ABBR.map((d) => (
                <div key={d} className="text-center text-[11px] text-sx-muted py-1 font-heading font-medium uppercase tracking-wide">
                  {d}
                </div>
              ))}
            </div>

            {/* Calendar grid */}
            {slotsLoading ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="flex flex-col items-center gap-3 text-sx-muted">
                  <Spinner />
                  <span className="text-xs">Загружаем расписание...</span>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-7 gap-1">
                {monthDays.map((cell, i) => {
                  if (!cell.date || !cell.ymd) {
                    return <div key={`empty-${i}`} />;
                  }
                  const ymd       = cell.ymd;
                  const disabled  = isDayDisabled(ymd);
                  const isToday   = ymd === todayStr;
                  const isSelected = selectedDate ? toYMD(selectedDate) === ymd : false;

                  return (
                    <button
                      key={ymd}
                      disabled={disabled}
                      onClick={() => { setSelectedDate(cell.date!); setStep(2); }}
                      className={`
                        relative aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all
                        ${disabled
                          ? "text-sx-border cursor-not-allowed"
                          : isSelected
                            ? "bg-sx-accent text-sx-deep font-bold cursor-pointer"
                            : "text-sx-cream hover:bg-sx-surface hover:border-sx-accent/40 border border-transparent cursor-pointer"
                        }
                      `}
                    >
                      {cell.date.getDate()}
                      {/* Today dot */}
                      {isToday && !isSelected && (
                        <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-sx-accent" />
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Legend */}
            <div className="mt-4 flex items-center gap-4 text-[11px] text-sx-muted">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-sx-surface border border-sx-border inline-block" />
                доступно
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-transparent border border-sx-border/30 inline-block opacity-40" />
                нет мест
              </span>
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Time ──────────────────────────────────────────────────── */}
        {step === 2 && (
          <motion.div key="step2" variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.25 }} className="flex flex-col flex-1"
          >
            <p className="text-sx-muted text-sm mb-1">Выберите время</p>
            <p className="text-sx-cream text-sm font-semibold mb-4">
              {selectedDate && formatDateFull(selectedDate)}
            </p>

            {timesForDay.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 text-sx-muted">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                <p className="text-sm text-center">На этот день больше нет свободного времени</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {timesForDay.map((t) => (
                  <button
                    key={t}
                    onClick={() => { setSelectedTime(t); setStep(3); }}
                    className={`py-2.5 rounded-lg text-sm transition-all cursor-pointer border font-medium ${
                      selectedTime === t
                        ? "bg-sx-accent text-sx-deep border-sx-accent"
                        : "bg-sx-deep border-sx-border text-sx-cream hover:border-sx-accent/50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            )}

            <div className="mt-auto pt-4">
              <button onClick={() => setStep(1)}
                className="px-4 py-2 rounded-lg font-heading font-medium text-sm text-sx-muted hover:text-sx-cream transition-colors cursor-pointer">
                ← Назад
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step 3: Contacts ──────────────────────────────────────────────── */}
        {step === 3 && (
          <motion.div key="step3" variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.25 }} className="flex flex-col flex-1"
          >
            <p className="text-sx-muted text-sm mb-4">Контактные данные</p>
            <div className="space-y-3">
              <div>
                <input type="text" placeholder="Название бизнеса *"
                  value={form.business} onChange={(e) => updateField("business", e.target.value)}
                  className={errors.business ? inputErr : inputNormal} />
                {errors.business && <p className="text-sx-hot text-xs mt-1 pl-1">{errors.business}</p>}
              </div>
              <div>
                <input type="text" placeholder="Ваше имя *"
                  value={form.name} onChange={(e) => updateField("name", e.target.value)}
                  className={errors.name ? inputErr : inputNormal} />
                {errors.name && <p className="text-sx-hot text-xs mt-1 pl-1">{errors.name}</p>}
              </div>
              <div>
                <input type="tel" placeholder="Телефон *"
                  value={form.phone} onChange={(e) => updateField("phone", e.target.value)}
                  className={errors.phone ? inputErr : inputNormal} />
                {errors.phone && <p className="text-sx-hot text-xs mt-1 pl-1">{errors.phone}</p>}
              </div>
              <div>
                <input type="text" placeholder="Telegram (необязательно)"
                  value={form.telegram} onChange={(e) => updateField("telegram", e.target.value)}
                  className={errors.telegram ? inputErr : inputNormal} />
                {errors.telegram && <p className="text-sx-hot text-xs mt-1 pl-1">{errors.telegram}</p>}
              </div>
              <input type="email" placeholder="Email (необязательно)"
                value={form.email} onChange={(e) => updateField("email", e.target.value)}
                className={inputNormal} />
            </div>

            {submitError && <p className="text-sx-hot text-xs mt-3 text-center">{submitError}</p>}

            <div className="mt-auto pt-6 flex justify-between items-center">
              <button onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-lg font-heading font-medium text-sm text-sx-muted hover:text-sx-cream transition-colors cursor-pointer">
                Назад
              </button>
              <button onClick={handleSubmit} disabled={loading}
                className={`px-6 py-2.5 rounded-lg font-heading font-medium text-sm transition-all cursor-pointer flex items-center gap-2 ${
                  loading
                    ? "bg-sx-border text-sx-muted cursor-not-allowed"
                    : "bg-sx-accent text-sx-deep hover:bg-sx-accent-hover active:scale-[0.98]"
                }`}
              >
                {loading ? <><Spinner />Отправляем...</> : "Записаться"}
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step 4: Telegram confirmation ─────────────────────────────────── */}
        {step === 4 && (
          <motion.div key="step4" variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-1 items-center justify-center text-center py-2"
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-[#2AABEE]/10 border-2 border-[#2AABEE]/30 flex items-center justify-center mb-5"
            >
              <TelegramIcon size={28} className="text-[#2AABEE]" />
            </motion.div>

            <motion.h3 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }} className="font-heading text-xl font-bold text-sx-cream mb-2">
              Запись почти готова
            </motion.h3>

            <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }} className="text-sx-muted text-sm mb-4 leading-relaxed">
              Нажмите кнопку ниже — Telegram откроется автоматически<br className="hidden sm:block" />
              и запись будет подтверждена.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.33 }} className="flex items-center gap-3 mb-5">
              <div className="flex items-center gap-1.5 bg-sx-surface/60 border border-sx-border rounded-lg px-3 py-1.5 text-sx-cream text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sx-accent">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {selectedDate ? formatDateFull(selectedDate) : "—"}
              </div>
              <div className="flex items-center gap-1.5 bg-sx-surface/60 border border-sx-border rounded-lg px-3 py-1.5 text-sx-cream text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sx-accent">
                  <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                </svg>
                {selectedTime ?? "—"}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.38, type: "spring", stiffness: 260, damping: 20 }}
              className="bg-sx-deep border border-sx-accent/20 rounded-xl px-6 py-3 mb-6 w-full"
            >
              <p className="text-[11px] text-sx-muted uppercase tracking-[0.18em] mb-1">код подтверждения</p>
              <p className="font-heading text-3xl font-extrabold text-sx-accent tracking-widest">{confirmCode}</p>
            </motion.div>

            <motion.a href={tgUrl} target="_blank" rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44 }}
              className="w-full flex items-center justify-center gap-2.5 bg-[#2AABEE] text-white rounded-xl py-3.5 font-heading font-semibold text-sm hover:bg-[#1d95d6] active:scale-[0.98] transition-all cursor-pointer">
              <TelegramIcon size={18} />
              Подтвердить в Telegram
            </motion.a>

            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }} onClick={() => setStep(3)}
              className="text-sx-muted/60 hover:text-sx-muted text-xs mt-4 transition-colors cursor-pointer underline underline-offset-2">
              Вернуться назад
            </motion.button>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }} className="text-sx-muted/40 text-xs mt-3">
              После подтверждения мы пришлём детали записи
            </motion.p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
