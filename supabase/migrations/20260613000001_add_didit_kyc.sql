-- Didit KYC Verification for Sellers
-- Adds columns to seller_profiles for tracking identity verification status

ALTER TABLE seller_profiles
  ADD COLUMN IF NOT EXISTS didit_verification_status TEXT NOT NULL DEFAULT 'not_started'
    CHECK (didit_verification_status IN ('not_started', 'pending', 'approved', 'declined', 'expired')),
  ADD COLUMN IF NOT EXISTS didit_session_id TEXT;

-- Index for looking up by session ID
CREATE INDEX IF NOT EXISTS idx_seller_profiles_didit_session
  ON seller_profiles(didit_session_id);
