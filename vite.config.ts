import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    headers: {
      // Habilita WebAssembly
      'content-security-policy':
        "default-src 'self'; " +
        "script-src 'self' 'unsafe-inline' 'unsafe-eval' 'wasm-unsafe-eval' https://vlibras.gov.br; " +
        "style-src 'self' 'unsafe-inline' https://vlibras.gov.br; " +
        "img-src 'self' data: https: https://vlibras.gov.br; " +
        "font-src 'self' data: https://vlibras.gov.br; " +
        "connect-src 'self' https://vlibras.gov.br wss://localhost:*; " +
        "frame-src https://vlibras.gov.br; " +
        "worker-src 'self' blob:; " +
        "child-src 'self' blob:;"
    }
  },

  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  }
})
