/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPBASE_ANON_KEY: string;
  readonly VITE_SUPBASE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
