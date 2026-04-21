/*
  # Initialize NMU UP Nonprofit Intelligence Schema

  Starts the database by provisioning the full schema the dashboard depends on.
  All tables are read-public (research data) and protected by RLS for writes.

  1. New Tables
    - `data_sources_2024` — metadata for tracking data provenance and reliability.
    - `nonprofits_2024` — core registry of Upper Peninsula nonprofit organizations
      with county, sector, revenue, assets, employees, wages, NTEE code, year,
      confidence score, and provenance link.
    - `propublica_cache_2024` — cached ProPublica filings by EIN + tax_period with
      filing_type, fiscal_year, assets, revenue, employees, and verification flag.
    - `sync_logs_2024` — audit trail for sync operations (records processed,
      growth detected, revenue adjustment percent, status).

  2. Security
    - Row Level Security enabled on every table.
    - Public SELECT policies for anon + authenticated roles so the dashboard can
      read research data without a user session.
    - INSERT/UPDATE policies restricted to authenticated users only; service role
      (used by edge functions / sync) bypasses RLS by default.

  3. Indexes
    - County, sector, fiscal year and tax period indexes to keep dashboard
      filters responsive as data grows beyond tens of thousands of rows.
    - Composite unique constraint on (ein, tax_period) in propublica_cache_2024
      to support idempotent upserts from the sync service.

  4. Seed
    - Inserts "IRS Business Master File" as the default reliable data source.
*/

-- Data sources
CREATE TABLE IF NOT EXISTS data_sources_2024 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  reliability_weight numeric DEFAULT 0.95,
  last_scraped timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE data_sources_2024 ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'data_sources_2024' AND policyname = 'Public read data sources') THEN
    CREATE POLICY "Public read data sources" ON data_sources_2024 FOR SELECT TO anon, authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'data_sources_2024' AND policyname = 'Authenticated insert data sources') THEN
    CREATE POLICY "Authenticated insert data sources" ON data_sources_2024 FOR INSERT TO authenticated WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'data_sources_2024' AND policyname = 'Authenticated update data sources') THEN
    CREATE POLICY "Authenticated update data sources" ON data_sources_2024 FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

-- Core nonprofit registry
CREATE TABLE IF NOT EXISTS nonprofits_2024 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ein text UNIQUE NOT NULL,
  name text NOT NULL,
  county text NOT NULL DEFAULT '',
  sector text NOT NULL DEFAULT '',
  revenue numeric DEFAULT 0,
  assets numeric DEFAULT 0,
  employees integer DEFAULT 0,
  wage_avg numeric DEFAULT 0,
  ntee_code text DEFAULT '',
  year integer DEFAULT 2022,
  confidence_score numeric DEFAULT 1.0,
  data_source_id uuid REFERENCES data_sources_2024(id),
  created_at timestamptz DEFAULT now(),
  last_synced_at timestamptz DEFAULT now()
);

ALTER TABLE nonprofits_2024 ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'nonprofits_2024' AND policyname = 'Public read nonprofits') THEN
    CREATE POLICY "Public read nonprofits" ON nonprofits_2024 FOR SELECT TO anon, authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'nonprofits_2024' AND policyname = 'Authenticated insert nonprofits') THEN
    CREATE POLICY "Authenticated insert nonprofits" ON nonprofits_2024 FOR INSERT TO authenticated WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'nonprofits_2024' AND policyname = 'Authenticated update nonprofits') THEN
    CREATE POLICY "Authenticated update nonprofits" ON nonprofits_2024 FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_nonprofits_county ON nonprofits_2024(county);
CREATE INDEX IF NOT EXISTS idx_nonprofits_sector ON nonprofits_2024(sector);
CREATE INDEX IF NOT EXISTS idx_nonprofits_year ON nonprofits_2024(year);
CREATE INDEX IF NOT EXISTS idx_nonprofits_county_year ON nonprofits_2024(county, year);

-- ProPublica cache (historical filings)
CREATE TABLE IF NOT EXISTS propublica_cache_2024 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ein text NOT NULL,
  organization_name text NOT NULL DEFAULT '',
  county text NOT NULL DEFAULT '',
  sector text NOT NULL DEFAULT '',
  ntee_code text DEFAULT '',
  revenue numeric DEFAULT 0,
  assets numeric DEFAULT 0,
  total_assets_end_year numeric DEFAULT 0,
  employees integer DEFAULT 0,
  wage_avg numeric DEFAULT 0,
  fiscal_year integer NOT NULL DEFAULT 2022,
  tax_period integer NOT NULL DEFAULT 202212,
  filing_type text DEFAULT '990',
  pdf_url text DEFAULT '',
  is_verified boolean DEFAULT true,
  last_verified_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  CONSTRAINT propublica_cache_ein_period_unique UNIQUE (ein, tax_period)
);

ALTER TABLE propublica_cache_2024 ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'propublica_cache_2024' AND policyname = 'Public read cache') THEN
    CREATE POLICY "Public read cache" ON propublica_cache_2024 FOR SELECT TO anon, authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'propublica_cache_2024' AND policyname = 'Authenticated insert cache') THEN
    CREATE POLICY "Authenticated insert cache" ON propublica_cache_2024 FOR INSERT TO authenticated WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'propublica_cache_2024' AND policyname = 'Authenticated update cache') THEN
    CREATE POLICY "Authenticated update cache" ON propublica_cache_2024 FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_cache_ein ON propublica_cache_2024(ein);
CREATE INDEX IF NOT EXISTS idx_cache_county_year ON propublica_cache_2024(county, fiscal_year);
CREATE INDEX IF NOT EXISTS idx_cache_sector ON propublica_cache_2024(sector);
CREATE INDEX IF NOT EXISTS idx_cache_filing_type ON propublica_cache_2024(filing_type);
CREATE INDEX IF NOT EXISTS idx_cache_tax_period ON propublica_cache_2024(tax_period);

-- Sync audit log
CREATE TABLE IF NOT EXISTS sync_logs_2024 (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sync_date timestamptz DEFAULT now(),
  records_processed integer DEFAULT 0,
  new_growth_detected integer DEFAULT 0,
  revenue_adjustment_pct numeric DEFAULT 0,
  status text DEFAULT 'success',
  notes text DEFAULT ''
);

ALTER TABLE sync_logs_2024 ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'sync_logs_2024' AND policyname = 'Public read sync logs') THEN
    CREATE POLICY "Public read sync logs" ON sync_logs_2024 FOR SELECT TO anon, authenticated USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'sync_logs_2024' AND policyname = 'Authenticated insert sync logs') THEN
    CREATE POLICY "Authenticated insert sync logs" ON sync_logs_2024 FOR INSERT TO authenticated WITH CHECK (true);
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_sync_logs_date ON sync_logs_2024(sync_date DESC);

-- Seed default data source
INSERT INTO data_sources_2024 (name, reliability_weight)
SELECT 'IRS Business Master File', 0.98
WHERE NOT EXISTS (SELECT 1 FROM data_sources_2024 WHERE name = 'IRS Business Master File');

INSERT INTO data_sources_2024 (name, reliability_weight)
SELECT 'ProPublica Nonprofit Explorer', 0.95
WHERE NOT EXISTS (SELECT 1 FROM data_sources_2024 WHERE name = 'ProPublica Nonprofit Explorer');
