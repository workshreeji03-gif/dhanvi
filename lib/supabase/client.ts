import { createBrowserClient } from "@supabase/ssr";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "./config";

let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || SUPABASE_ANON_KEY;

  if (typeof window !== "undefined") {
    if (!client) {
      client = createBrowserClient(supabaseUrl, supabaseKey);
    }
    return client;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}