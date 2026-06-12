/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REPORTS_URL?: string;
  readonly VITE_REPORTS_LIST_URL?: string;
  readonly VITE_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
