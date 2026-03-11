export type BookingStatus = "pending" | "confirmed";

export interface PendingBooking {
  code: string;
  name: string;
  phone: string;
  business: string;
  telegram: string | null;
  email: string | null;
  date: string;
  time: string;
  status: BookingStatus;
  createdAt: string;
  telegramUserId?: string | null;
}

// In-memory store — survives across requests in the same process.
// For serverless / multi-instance production, replace with a real DB or Redis.
declare global {
  // eslint-disable-next-line no-var
  var _servexBookings: Map<string, PendingBooking> | undefined;
}
const store: Map<string, PendingBooking> =
  global._servexBookings || (global._servexBookings = new Map());

/** Generates a unique booking code, e.g. SVX-K3M9A2 */
export function generateCode(): string {
  const ts = Date.now().toString(36).toUpperCase().slice(-3);
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `SVX-${ts}${rand}`;
}

/** Strip spaces, dashes, dots, parentheses from a phone number */
export function normalizePhone(phone: string): string {
  return phone.replace(/[\s\-().]/g, "");
}

/**
 * Returns true if the phone number looks valid.
 * Accepts: +7XXXXXXXXXX, 8XXXXXXXXXX, international +XXXXXXXXXXX (10–15 digits)
 */
export function validatePhone(phone: string): boolean {
  const p = normalizePhone(phone);
  if (/^(\+7|8)\d{10}$/.test(p)) return true;
  if (/^\+\d{10,15}$/.test(p)) return true;
  // bare 10 digits (will be treated as RU mobile)
  if (/^\d{10}$/.test(p)) return true;
  return false;
}

/**
 * Returns true if the Telegram username is valid (or empty — field is optional).
 * Strips leading @ before checking. Rules: 5–32 chars, [a-zA-Z0-9_], must start with letter/digit.
 */
export function validateTelegram(username: string): boolean {
  if (!username.trim()) return true;
  const clean = username.trim().replace(/^@/, "");
  return /^[a-zA-Z0-9][a-zA-Z0-9_]{4,31}$/.test(clean);
}

export function createBooking(
  data: Omit<PendingBooking, "status" | "createdAt">
): PendingBooking {
  const booking: PendingBooking = {
    ...data,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  store.set(data.code, booking);
  return booking;
}

export function getBookingByCode(code: string): PendingBooking | undefined {
  return store.get(code);
}

export function confirmBooking(
  code: string,
  telegramUserId?: string
): PendingBooking | null {
  const booking = store.get(code);
  if (!booking) return null;
  booking.status = "confirmed";
  if (telegramUserId) booking.telegramUserId = telegramUserId;
  return booking;
}
