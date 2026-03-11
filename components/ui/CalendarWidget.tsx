"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { validatePhone, validateTelegram } from "@/lib/booking";

const DAY_NAMES = ["Пн", "Вт", "Ср", "Чт", "Пт"];
const MONTH_NAMES = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

const TIME_SLOTS = [
  "10:00", "11:00", "12:00", "13:00", "14:00",
  "15:00", "16:00", "17:00", "18:00",
];

const CONFIRM_CONTACT =
  process.env.NEXT_PUBLIC_TELEGRAM_CONTACT || "ss_bizness";

function getNext14Weekdays(): Date[] {
  const dates: Date[] = [];
  const now = new Date();
  let current = new Date(now);
  current.setDate(current.getDate() + 1);
  while (dates.length < 14) {
    const day = current.getDay();
    if (day !== 0 && day !== 6) dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

function formatDateFull(date: Date): string {
  return `${date.getDate()} ${MONTH_NAMES[date.getMonth()]}`;
}

function getDayAbbr(date: Date): string {
  return DAY_NAMES[date.getDay() - 1] || "";
}

type FormData = {
  name: string;
  phone: string;
  business: string;
  telegram: string;
  email: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;

const inputBase =
  "w-full bg-sx-deep border rounded-lg px-4 py-3 text-sx-cream placeholder:text-sx-muted focus:outline-none transition-colors text-sm";
const inputNormal = `${inputBase} border-sx-border focus:border-sx-accent`;
const inputError  = `${inputBase} border-sx-hot/60 focus:border-sx-hot`;

function TelegramIcon({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  );
}

export default function CalendarWidget({ onClose }: { onClose: () => void }) {
  const [step, setStep]               = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm]               = useState<FormData>({
    name: "", phone: "", business: "", telegram: "", email: "",
  });
  const [errors, setErrors]   = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [confirmCode, setConfirmCode] = useState("");

  const dates = getNext14Weekdays();

  const slideVariants = {
    enter:  { opacity: 0, x: 40 },
    center: { opacity: 1, x: 0  },
    exit:   { opacity: 0, x: -40 },
  };

  // ── Validation ──────────────────────────────────────────────────────────────
  function validateForm(): FormErrors {
    const errs: FormErrors = {};

    if (!form.name.trim())     errs.name     = "Введите имя";
    if (!form.business.trim()) errs.business = "Введите название бизнеса";

    if (!form.phone.trim()) {
      errs.phone = "Введите телефон";
    } else if (!validatePhone(form.phone)) {
      errs.phone = "Неверный формат телефона";
    }

    if (form.telegram && !validateTelegram(form.telegram)) {
      errs.telegram = "Неверный формат (от 5 символов, только буквы, цифры, _)";
    }

    return errs;
  }

  // ── Submit ──────────────────────────────────────────────────────────────────
  async function handleSubmit() {
    const errs = validateForm();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

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
          time:     selectedTime,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error ?? "Ошибка при отправке. Попробуйте ещё раз.");
        return;
      }

      setConfirmCode(data.code);
      setStep(4);
    } catch {
      setSubmitError("Нет соединения. Проверьте интернет и попробуйте снова.");
    } finally {
      setLoading(false);
    }
  }

  function updateField(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    setSubmitError("");
  }

  const tgMessage = `Подтверждаю запись на демо\nКод: ${confirmCode}`;
  const tgUrl = `https://t.me/${CONFIRM_CONTACT}?text=${encodeURIComponent(tgMessage)}`;

  return (
    <div className="min-h-[360px] flex flex-col">
      <AnimatePresence mode="wait">

        {/* ── Step 1: Date ───────────────────────────────────────────────────── */}
        {step === 1 && (
          <motion.div
            key="step1"
            variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-1"
          >
            <p className="text-sx-muted text-sm mb-4">Выберите дату</p>
            <div className="grid grid-cols-5 sm:grid-cols-7 gap-2">
              {dates.map((d, i) => {
                const isSelected = selectedDate?.toDateString() === d.toDateString();
                return (
                  <button
                    key={i}
                    onClick={() => { setSelectedDate(d); setStep(2); }}
                    className={`flex flex-col items-center py-2.5 px-1 rounded-lg text-sm transition-all cursor-pointer border ${
                      isSelected
                        ? "bg-sx-accent text-sx-deep border-sx-accent font-semibold"
                        : "bg-sx-deep border-sx-border text-sx-cream hover:border-sx-accent/50"
                    }`}
                  >
                    <span className="text-[11px] uppercase opacity-70">{getDayAbbr(d)}</span>
                    <span className="font-medium">{d.getDate()}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Time ───────────────────────────────────────────────────── */}
        {step === 2 && (
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-1"
          >
            <p className="text-sx-muted text-sm mb-1">Выберите время</p>
            <p className="text-sx-cream text-sm font-medium mb-4">
              {selectedDate && formatDateFull(selectedDate)}
            </p>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((t) => (
                <button
                  key={t}
                  onClick={() => { setSelectedTime(t); setStep(3); }}
                  className={`py-2.5 rounded-lg text-sm transition-all cursor-pointer border ${
                    selectedTime === t
                      ? "bg-sx-accent text-sx-deep border-sx-accent font-semibold"
                      : "bg-sx-deep border-sx-border text-sx-cream hover:border-sx-accent/50"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="mt-auto pt-4">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 rounded-lg font-heading font-medium text-sm text-sx-muted hover:text-sx-cream transition-colors cursor-pointer"
              >
                ← Назад
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step 3: Contacts ───────────────────────────────────────────────── */}
        {step === 3 && (
          <motion.div
            key="step3"
            variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-1"
          >
            <p className="text-sx-muted text-sm mb-4">Контактные данные</p>
            <div className="space-y-3">

              {/* Business (required) */}
              <div>
                <input
                  type="text"
                  placeholder="Название бизнеса *"
                  value={form.business}
                  onChange={(e) => updateField("business", e.target.value)}
                  className={errors.business ? inputError : inputNormal}
                />
                {errors.business && (
                  <p className="text-sx-hot text-xs mt-1 pl-1">{errors.business}</p>
                )}
              </div>

              {/* Name (required) */}
              <div>
                <input
                  type="text"
                  placeholder="Ваше имя *"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                  className={errors.name ? inputError : inputNormal}
                />
                {errors.name && (
                  <p className="text-sx-hot text-xs mt-1 pl-1">{errors.name}</p>
                )}
              </div>

              {/* Phone (required) */}
              <div>
                <input
                  type="tel"
                  placeholder="Телефон *"
                  value={form.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className={errors.phone ? inputError : inputNormal}
                />
                {errors.phone && (
                  <p className="text-sx-hot text-xs mt-1 pl-1">{errors.phone}</p>
                )}
              </div>

              {/* Telegram (optional) */}
              <div>
                <input
                  type="text"
                  placeholder="Telegram (необязательно)"
                  value={form.telegram}
                  onChange={(e) => updateField("telegram", e.target.value)}
                  className={errors.telegram ? inputError : inputNormal}
                />
                {errors.telegram && (
                  <p className="text-sx-hot text-xs mt-1 pl-1">{errors.telegram}</p>
                )}
              </div>

              {/* Email (optional) */}
              <input
                type="email"
                placeholder="Email (необязательно)"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={inputNormal}
              />
            </div>

            {/* Server-side error */}
            {submitError && (
              <p className="text-sx-hot text-xs mt-3 text-center">{submitError}</p>
            )}

            <div className="mt-auto pt-6 flex justify-between items-center">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-lg font-heading font-medium text-sm text-sx-muted hover:text-sx-cream transition-colors cursor-pointer"
              >
                Назад
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`px-6 py-2.5 rounded-lg font-heading font-medium text-sm transition-all cursor-pointer flex items-center gap-2 ${
                  loading
                    ? "bg-sx-border text-sx-muted cursor-not-allowed"
                    : "bg-sx-accent text-sx-deep hover:bg-sx-accent-hover active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="31.4 31.4" />
                    </svg>
                    Отправляем...
                  </>
                ) : (
                  "Записаться"
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* ── Step 4: Telegram confirmation ─────────────────────────────────── */}
        {step === 4 && (
          <motion.div
            key="step4"
            variants={slideVariants}
            initial="enter" animate="center" exit="exit"
            transition={{ duration: 0.25 }}
            className="flex flex-col flex-1 items-center justify-center text-center py-2"
          >
            {/* Telegram icon */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 22, delay: 0.1 }}
              className="w-16 h-16 rounded-full bg-[#2AABEE]/10 border-2 border-[#2AABEE]/30 flex items-center justify-center mb-5"
            >
              <TelegramIcon size={28} className="text-[#2AABEE]" />
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-heading text-xl font-bold text-sx-cream mb-2"
            >
              Запись почти готова
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28 }}
              className="text-sx-muted text-sm mb-4 leading-relaxed"
            >
              Нажмите кнопку ниже — Telegram откроется автоматически<br className="hidden sm:block" />
              и запись будет подтверждена.
            </motion.p>

            {/* Date / time summary */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.33 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="flex items-center gap-1.5 bg-sx-surface/60 border border-sx-border rounded-lg px-3 py-1.5 text-sx-cream text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sx-accent">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                {selectedDate ? formatDateFull(selectedDate) : "—"}
              </div>
              <div className="flex items-center gap-1.5 bg-sx-surface/60 border border-sx-border rounded-lg px-3 py-1.5 text-sx-cream text-sm">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-sx-accent">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                {selectedTime ?? "—"}
              </div>
            </motion.div>

            {/* Confirmation code (subtle) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.38, type: "spring", stiffness: 260, damping: 20 }}
              className="bg-sx-deep border border-sx-accent/20 rounded-xl px-6 py-3 mb-6 w-full"
            >
              <p className="text-[11px] text-sx-muted uppercase tracking-[0.18em] mb-1">
                код подтверждения
              </p>
              <p className="font-heading text-3xl font-extrabold text-sx-accent tracking-widest">
                {confirmCode}
              </p>
            </motion.div>

            {/* Telegram CTA */}
            <motion.a
              href={tgUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44 }}
              className="w-full flex items-center justify-center gap-2.5 bg-[#2AABEE] text-white rounded-xl py-3.5 font-heading font-semibold text-sm hover:bg-[#1d95d6] active:scale-[0.98] transition-all cursor-pointer"
            >
              <TelegramIcon size={18} />
              Подтвердить в Telegram
            </motion.a>

            {/* Back link */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              onClick={() => setStep(3)}
              className="text-sx-muted/60 hover:text-sx-muted text-xs mt-4 transition-colors cursor-pointer underline underline-offset-2"
            >
              Вернуться назад
            </motion.button>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sx-muted/40 text-xs mt-3"
            >
              После подтверждения мы пришлём детали записи
            </motion.p>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}
