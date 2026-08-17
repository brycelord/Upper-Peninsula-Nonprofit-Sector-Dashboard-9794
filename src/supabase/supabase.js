import { createClient } from '@supabase/supabase-js';

/**
 * Supabase client configuration.
 *
 * Credentials are loaded from Vite environment variables so they are never
 * committed to source control. Add the following to your .env file (see
 * .env.example in the project root):
 *
 *   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
 *   VITE_SUPABASE_ANON_KEY=your-anon-key
 *
 * The .env file is listed in .gitignore and must NEVER be committed.
 * In production (Netlify / Vercel / etc.) set these as environment variables
 * in your hosting provider's dashboard.
 */
const SUPABASE_URL      = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing Supabase environment variables. ' +
    'Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file. ' +
    'See .env.example for reference.'
  );
}

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});
