-- ============================================================
-- Fix auth sign-in issues for users who signed up before the
-- handle_new_user trigger existed.
--
-- Problems fixed:
-- 1. The `users` table has `password_hash TEXT NOT NULL` but
--    the app uses Supabase Auth (passwords managed separately).
--    The handle_new_user trigger and the fallback code in
--    AuthContext.tsx don't provide password_hash, causing
--    INSERT failures.
-- 2. Existing auth users may not have a corresponding row in
--    public.users if they signed up before the trigger was added.
-- 3. The `users` table has no INSERT RLS policy, so the fallback
--    code in AuthContext.tsx that tries to create missing user
--    rows gets blocked by RLS.
-- ============================================================

-- Make password_hash nullable since we use Supabase Auth for passwords
ALTER TABLE users ALTER COLUMN password_hash DROP NOT NULL;

-- Also make it optional by setting a default
ALTER TABLE users ALTER COLUMN password_hash SET DEFAULT NULL;

-- ============================================================
-- Add INSERT policy for users table.
-- Users can insert their own row (needed for the fallback in
-- fetchUserProfile when the trigger hasn't created the row yet).
-- ============================================================
CREATE POLICY "Users can insert their own data"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

-- ============================================================
-- Backfill: create missing user rows for existing auth users
-- who don't have a corresponding public.users row.
-- This ensures existing users can sign in successfully.
-- ============================================================
INSERT INTO public.users (id, email, full_name, role, is_verified)
SELECT
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data ->> 'full_name', split_part(au.email, '@', 1), ''),
  'buyer',
  false
FROM auth.users au
WHERE NOT EXISTS (
  SELECT 1 FROM public.users pu WHERE pu.id = au.id
)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Update the handle_new_user trigger to not require password_hash
-- (it already doesn't provide it, but this ensures consistency)
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, role, is_verified)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', ''),
    'buyer',
    false
  );
  RETURN NEW;
END;
$$;
