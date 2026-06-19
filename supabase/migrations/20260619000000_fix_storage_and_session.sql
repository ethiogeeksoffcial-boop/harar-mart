-- Storage policies for product-images and house-images buckets
-- Allow authenticated users to upload, and public to read

-- product-images bucket policies
DO $$
BEGIN
  -- Allow public read access
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'product-images: public read'
  ) THEN
    CREATE POLICY "product-images: public read"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'product-images');
  END IF;

  -- Allow authenticated users to upload
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'product-images: authenticated upload'
  ) THEN
    CREATE POLICY "product-images: authenticated upload"
      ON storage.objects FOR INSERT
      WITH CHECK (bucket_id = 'product-images' AND auth.role() = 'authenticated');
  END IF;

  -- Allow authenticated users to update their uploads
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'product-images: authenticated update'
  ) THEN
    CREATE POLICY "product-images: authenticated update"
      ON storage.objects FOR UPDATE
      USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
  END IF;

  -- Allow authenticated users to delete their uploads
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'product-images: authenticated delete'
  ) THEN
    CREATE POLICY "product-images: authenticated delete"
      ON storage.objects FOR DELETE
      USING (bucket_id = 'product-images' AND auth.role() = 'authenticated');
  END IF;

  -- house-images bucket policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'house-images: public read'
  ) THEN
    CREATE POLICY "house-images: public read"
      ON storage.objects FOR SELECT
      USING (bucket_id = 'house-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'house-images: authenticated upload'
  ) THEN
    CREATE POLICY "house-images: authenticated upload"
      ON storage.objects FOR INSERT
      WITH CHECK (bucket_id = 'house-images' AND auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'house-images: authenticated update'
  ) THEN
    CREATE POLICY "house-images: authenticated update"
      ON storage.objects FOR UPDATE
      USING (bucket_id = 'house-images' AND auth.role() = 'authenticated');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects' AND policyname = 'house-images: authenticated delete'
  ) THEN
    CREATE POLICY "house-images: authenticated delete"
      ON storage.objects FOR DELETE
      USING (bucket_id = 'house-images' AND auth.role() = 'authenticated');
  END IF;
END $$;
