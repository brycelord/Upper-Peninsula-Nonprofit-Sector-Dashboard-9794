/* 
# ProPublica API v2 Schema Alignment
1. Modified Tables
  - `propublica_cache_2024`: Added columns for filing types and tax periods.
2. New Columns
  - `filing_type`: (text) Stores '990', '990EZ', or '990PF'.
  - `tax_period`: (integer) Stores the YYYYMM period for historical tracking.
  - `pdf_url`: (text) Direct link to the ProPublica source filing.
  - `total_assets_end_year`: (numeric) Detailed asset tracking.
3. Security
  - Maintains existing RLS policies.
*/

DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='propublica_cache_2024' AND column_name='filing_type') THEN
        ALTER TABLE propublica_cache_2024 ADD COLUMN filing_type text DEFAULT '990';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='propublica_cache_2024' AND column_name='tax_period') THEN
        ALTER TABLE propublica_cache_2024 ADD COLUMN tax_period integer;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='propublica_cache_2024' AND column_name='pdf_url') THEN
        ALTER TABLE propublica_cache_2024 ADD COLUMN pdf_url text;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='propublica_cache_2024' AND column_name='total_assets_end_year') THEN
        ALTER TABLE propublica_cache_2024 ADD COLUMN total_assets_end_year numeric DEFAULT 0;
    END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_cache_filing_type ON propublica_cache_2024(filing_type);
CREATE INDEX IF NOT EXISTS idx_cache_tax_period ON propublica_cache_2024(tax_period);