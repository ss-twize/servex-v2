-- ============================================================
-- SERVEX demo booking — Supabase migration
-- Run in: https://supabase.com/dashboard/project/<YOUR_PROJECT>/sql
-- ============================================================

-- 1. Available demo slots
CREATE TABLE IF NOT EXISTS demo_slots (
  id         bigserial PRIMARY KEY,
  slot_date  date        NOT NULL,
  slot_time  text        NOT NULL,  -- "10:00" … "18:00"
  is_booked  boolean     NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (slot_date, slot_time)
);

-- 2. Bookings
CREATE TABLE IF NOT EXISTS demo_bookings (
  id               bigserial   PRIMARY KEY,
  code             text        NOT NULL UNIQUE,
  name             text        NOT NULL,
  phone            text        NOT NULL,
  business         text        NOT NULL,
  telegram         text,
  email            text,
  slot_date        date,
  slot_time        text,
  date_label       text,        -- "14 марта" — human-readable
  status           text        NOT NULL DEFAULT 'pending',
  telegram_user_id text,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- 3. Row Level Security
ALTER TABLE demo_slots    ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_bookings ENABLE ROW LEVEL SECURITY;

-- Public can read slots (to show availability)
DROP POLICY IF EXISTS "public_read_slots" ON demo_slots;
CREATE POLICY "public_read_slots"
  ON demo_slots FOR SELECT USING (true);

-- Only service role can write slots / bookings (API uses service key)
-- If you don't have a service key, temporarily allow anon writes:
DROP POLICY IF EXISTS "anon_update_slots" ON demo_slots;
CREATE POLICY "anon_update_slots"
  ON demo_slots FOR UPDATE USING (true);

DROP POLICY IF EXISTS "anon_insert_bookings" ON demo_bookings;
CREATE POLICY "anon_insert_bookings"
  ON demo_bookings FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_bookings" ON demo_bookings;
CREATE POLICY "anon_update_bookings"
  ON demo_bookings FOR UPDATE USING (true);

DROP POLICY IF EXISTS "anon_read_bookings" ON demo_bookings;
CREATE POLICY "anon_read_bookings"
  ON demo_bookings FOR SELECT USING (true);

-- 4. Enable Realtime for slots (calendar auto-updates)
ALTER PUBLICATION supabase_realtime ADD TABLE demo_slots;

-- ============================================================
-- 5. Seed: generate slots for next 60 working days
--    Mon–Fri, 10:00–18:00 (every hour)
-- ============================================================
DO $$
DECLARE
  d    date    := CURRENT_DATE;
  t    text;
  times text[] := ARRAY['10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00'];
  cnt  int     := 0;
BEGIN
  WHILE cnt < 60 LOOP
    IF EXTRACT(DOW FROM d) NOT IN (0, 6) THEN  -- 0=Sun, 6=Sat
      FOREACH t IN ARRAY times LOOP
        INSERT INTO demo_slots (slot_date, slot_time)
        VALUES (d, t)
        ON CONFLICT DO NOTHING;
      END LOOP;
      cnt := cnt + 1;
    END IF;
    d := d + 1;
  END LOOP;
END $$;
