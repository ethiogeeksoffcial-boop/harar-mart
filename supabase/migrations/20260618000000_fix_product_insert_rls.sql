-- Fix: Allow unverified sellers to insert products
-- The previous policy required is_verified = true, which blocked new sellers
-- from adding products even though they had a seller profile.

DROP POLICY IF EXISTS "Sellers can insert their own products" ON products;

CREATE POLICY "Sellers can insert their own products"
  ON products FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM seller_profiles
      WHERE seller_profiles.id = products.seller_id
        AND seller_profiles.user_id = auth.uid()
    )
    OR EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );
