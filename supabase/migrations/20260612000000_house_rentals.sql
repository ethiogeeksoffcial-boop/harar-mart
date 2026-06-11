-- House Rentals table
CREATE TABLE IF NOT EXISTS house_rentals (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT NOT NULL,
  price       DECIMAL(10, 2) NOT NULL,
  bedrooms    INTEGER NOT NULL,
  bathrooms   INTEGER NOT NULL DEFAULT 1,
  square_feet INTEGER,
  location    TEXT NOT NULL,
  address     TEXT,
  images      TEXT[] DEFAULT '{}',
  amenities   TEXT[] DEFAULT '{}',
  status      TEXT NOT NULL DEFAULT 'available' CHECK (status IN ('available', 'rented')),
  created_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at  TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for filtering
CREATE INDEX IF NOT EXISTS idx_house_rentals_location ON house_rentals(location);
CREATE INDEX IF NOT EXISTS idx_house_rentals_price ON house_rentals(price);
CREATE INDEX IF NOT EXISTS idx_house_rentals_bedrooms ON house_rentals(bedrooms);
CREATE INDEX IF NOT EXISTS idx_house_rentals_status ON house_rentals(status);
CREATE INDEX IF NOT EXISTS idx_house_rentals_user ON house_rentals(user_id);

-- Enable RLS
ALTER TABLE house_rentals ENABLE ROW LEVEL SECURITY;

-- Anyone can view available rentals
CREATE POLICY "Anyone can view available rentals"
  ON house_rentals FOR SELECT
  USING (status = 'available' OR auth.uid() = user_id);

-- Authenticated users can insert their own listings
CREATE POLICY "Users can insert their own listings"
  ON house_rentals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Owners can update their own listings
CREATE POLICY "Owners can update their own listings"
  ON house_rentals FOR UPDATE
  USING (auth.uid() = user_id);

-- Owners can delete their own listings
CREATE POLICY "Owners can delete their own listings"
  ON house_rentals FOR DELETE
  USING (auth.uid() = user_id);

-- Updated_at trigger
CREATE TRIGGER update_house_rentals_updated_at
  BEFORE UPDATE ON house_rentals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
