import { createClient } from '@supabase/supabase-js'

// IMPORTANT: Replace these with your actual Supabase credentials from Settings > API
const SUPABASE_URL = 'https://hkfxqpkdzkqqwhtaumhz.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrZnhxcGtkemtxcXdodGF1bWh6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc4MDM4OTEsImV4cCI6MjA4MzM3OTg5MX0.NScoyXGCeg96G73aaXrNPuQ0eZFH0rEct_diX_qyqKs'

if(!SUPABASE_URL || !SUPABASE_ANON_KEY ){
  throw new Error('Missing Supabase variables');
}

export default createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
})