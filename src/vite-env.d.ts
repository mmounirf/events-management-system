/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPBASE_ANON_KEY: string;
  readonly VITE_SUPBASE_API_URL: string;
  readonly VITE_PROJECT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
