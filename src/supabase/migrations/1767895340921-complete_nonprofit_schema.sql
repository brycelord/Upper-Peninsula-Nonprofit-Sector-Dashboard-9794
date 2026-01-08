/* 
# Unified Nonprofit & Reliability Schema
1. New Tables
  - `nonprofits_2024`: Core data table for regional organizations.
  - `data_sources_2024`: Metadata for tracking data origins.
2. Changes
  - Ensures all reliability columns (confidence_score, data_source_id) are present.
3. Security
  - Enables RLS on all tables.
  - Adds public read policies for research access.
*/

-- 1. Create Data Sources Table First (Foreign Key Dependency)
CREATE TABLE IF NOT EXISTS data_sources_2024 (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    reliability_weight numeric DEFAULT 0.95,
    last_scraped timestamptz DEFAULT now()
);

-- 2. Create Core Nonprofits Table
CREATE TABLE IF NOT EXISTS nonprofits_2024 (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ein text UNIQUE NOT NULL,
    name text NOT NULL,
    county text NOT NULL,
    sector text NOT NULL,
    revenue numeric DEFAULT 0,
    assets numeric DEFAULT 0,
    employees integer DEFAULT 0,
    wage_avg numeric DEFAULT 0,
    ntee_code text,
    year integer DEFAULT 2022,
    confidence_score numeric DEFAULT 1.0, -- Added reliability column
    data_source_id uuid REFERENCES data_sources_2024(id), -- Added reliability link
    created_at timestamptz DEFAULT now(),
    last_synced_at timestamptz DEFAULT now()
);

-- 3. Security Setup
ALTER TABLE data_sources_2024 ENABLE ROW LEVEL SECURITY;
ALTER TABLE nonprofits_2024 ENABLE ROW LEVEL SECURITY;

-- 4. Policies (Public Read)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read sources') THEN
        CREATE POLICY "Allow public read sources" ON data_sources_2024 FOR SELECT TO anon USING (true);
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Allow public read access') THEN
        CREATE POLICY "Allow public read access" ON nonprofits_2024 FOR SELECT TO anon USING (true);
    END IF;
END $$;

-- 5. Performance Indexes
CREATE INDEX IF NOT EXISTS idx_nonprofits_county ON nonprofits_2024(county);
CREATE INDEX IF NOT EXISTS idx_nonprofits_sector ON nonprofits_2024(sector);
CREATE INDEX IF NOT EXISTS idx_nonprofits_year ON nonprofits_2024(year);

-- 6. Insert Initial Data Source
INSERT INTO data_sources_2024 (name, reliability_weight) 
VALUES ('IRS Business Master File', 0.98)
ON CONFLICT DO NOTHING;