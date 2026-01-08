/* 
# Add Reliability Metrics to Nonprofits Table

1. Changes
  - Adds `confidence_score` and `data_source_id` to the `nonprofits_2024` table.
  - Creates a new `data_sources` table to track metadata.

2. New Tables
  - `data_sources_2024`: Tracks reliability weights of different data providers.

3. Security
  - Enable RLS on `data_sources_2024`
  - Add public read policy
*/

-- 1. Create Data Sources Table
CREATE TABLE IF NOT EXISTS data_sources_2024 (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    reliability_weight numeric DEFAULT 0.95,
    last_scraped timestamptz DEFAULT now()
);

-- 2. Enable Security
ALTER TABLE data_sources_2024 ENABLE ROW LEVEL SECURITY;

-- 3. Create Policy
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'data_sources_2024' AND policyname = 'Allow public read sources'
    ) THEN
        CREATE POLICY "Allow public read sources" ON data_sources_2024 FOR SELECT TO anon USING (true);
    END IF;
END $$;

-- 4. Add columns to main table
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'nonprofits_2024' AND column_name = 'confidence_score') THEN
        ALTER TABLE nonprofits_2024 ADD COLUMN confidence_score numeric DEFAULT 1.0;
    END IF;
    
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'nonprofits_2024' AND column_name = 'data_source_id') THEN
        ALTER TABLE nonprofits_2024 ADD COLUMN data_source_id uuid REFERENCES data_sources_2024(id);
    END IF;
END $$;