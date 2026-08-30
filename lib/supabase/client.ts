import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | null = null;

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("your-project")) {
    return null;
  }

  if (typeof window !== "undefined") {
    if (!client) {
      client = createBrowserClient(supabaseUrl, supabaseKey);
    }
    return client;
  }

  return createBrowserClient(supabaseUrl, supabaseKey);
}