import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project')) {
    // Return dummy client if env not set
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}
