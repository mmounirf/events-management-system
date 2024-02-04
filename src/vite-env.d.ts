/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPBASE_ANON_KEY: string;
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_PROJECT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
