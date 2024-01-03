import { createClient } from "@supabase/supabase-js";
import { type Database } from "./database.types";

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPBASE_API_URL,
  import.meta.env.VITE_SUPBASE_ANON_KEY
);
