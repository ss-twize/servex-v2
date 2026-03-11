import { createClient, SupabaseClient } from "@supabase/supabase-js";

export interface DemoSlot {
  id: number;
  slot_date: string;   // "YYYY-MM-DD"
  slot_time: string;   // "10:00"
  is_booked: boolean;
}

let _client: SupabaseClient | null = null;

/** Returns a Supabase client, or null if env vars are not set (build time). */
export function getSupabase(): SupabaseClient | null {
  if (_client) return _client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  _client = createClient(url, key);
  return _client;
}

/** Convenience singleton — throws if env vars missing (server-side only). */
export const supabase = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabase();
    if (!client) throw new Error("Supabase env vars not set");
    return (client as unknown as Record<string | symbol, unknown>)[prop];
  },
});
