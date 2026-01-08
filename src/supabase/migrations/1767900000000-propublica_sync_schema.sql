/* 
# ProPublica Data Synchronization Schema
1. New Tables
  - `propublica_cache_2024`: Stores thousands of verified nonprofit records.
  - `sync_logs_2024`: Tracks monthly comparison and growth adjustments.
2. Security
  - Enable RLS on both tables.
  - Add public read access for dashboard consumption.
3. Purpose
  - Provides a persistent database for "several thousand" organizations.
  - Enables monthly comparison and delta tracking.
*/

CREATE TABLE IF NOT EXISTS propublica_cache_2024 (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    ein text UNIQUE NOT NULL,
    organization_name text NOT NULL,
    county text NOT NULL,
    sector text NOT NULL,
    ntee_code text,
    revenue numeric DEFAULT 0,
    assets numeric DEFAULT 0,
    employees integer DEFAULT 0,
    wage_avg numeric DEFAULT 0,
    fiscal_year integer NOT NULL,
    is_verified boolean DEFAULT true,
    last_verified_at timestamptz DEFAULT now(),
    created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS sync_logs_2024 (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    sync_date timestamptz DEFAULT now(),
    records_processed integer DEFAULT 0,
    new_growth_detected integer DEFAULT 0,
    revenue_adjustment_pct numeric DEFAULT 0,
    status text DEFAULT 'success'
);

ALTER TABLE propublica_cache_2024 ENABLE ROW LEVEL SECURITY;
ALTER TABLE sync_logs_2024 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read nonprofits" ON propublica_cache_2024 FOR SELECT TO anon USING (true);
CREATE POLICY "Public read sync logs" ON sync_logs_2024 FOR SELECT TO anon USING (true);

-- Indexes for high-performance filtering across thousands of rows
CREATE INDEX IF NOT EXISTS idx_cache_county_year ON propublica_cache_2024(county, fiscal_year);
CREATE INDEX IF NOT EXISTS idx_cache_sector ON propublica_cache_2024(sector);
CREATE INDEX IF NOT EXISTS idx_cache_ein ON propublica_cache_2024(ein);