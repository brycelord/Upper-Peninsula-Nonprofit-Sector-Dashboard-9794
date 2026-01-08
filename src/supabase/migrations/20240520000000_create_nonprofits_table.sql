/* 
  # Create Nonprofits Table for Regional Intelligence
  
  1. New Tables
    - `nonprofits_2024`
      - `id` (uuid, primary key)
      - `ein` (text, unique) - Employer Identification Number
      - `name` (text) - Legal name of the organization
      - `county` (text) - UP County location
      - `sector` (text) - Industry sector (Healthcare, Education, etc.)
      - `revenue` (numeric) - Annual gross receipts
      - `assets` (numeric) - Total net assets
      - `employees` (integer) - Number of FTEs
      - `wage_avg` (numeric) - Average annual wage
      - `ntee_code` (text) - National Taxonomy of Exempt Entities code
      - `last_synced_at` (timestamptz)
  
  2. Security
    - Enable RLS on `nonprofits_2024`
    - Add policy for public read access (research data)
*/

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
  created_at timestamptz DEFAULT now(),
  last_synced_at timestamptz DEFAULT now()
);

ALTER TABLE nonprofits_2024 ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access" 
  ON nonprofits_2024 
  FOR SELECT 
  TO anon 
  USING (true);

-- Indexes for performance as the dataset grows beyond 1,000 records
CREATE INDEX IF NOT EXISTS idx_nonprofits_county ON nonprofits_2024(county);
CREATE INDEX IF NOT EXISTS idx_nonprofits_sector ON nonprofits_2024(sector);