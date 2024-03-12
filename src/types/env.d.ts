interface ImportMetaEnv {
  readonly VITE_APP_BASE_API: string
  readonly VITE_APP_ASSET_PREFIX: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
