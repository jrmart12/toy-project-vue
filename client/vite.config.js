import { fileURLToPath, URL } from 'node:url'
import vitePluginRequire from 'vite-plugin-require'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080
  },
  plugins: [
    vue(),
    vitePluginRequire({ fileRegex: /(.jsx?|.tsx?|.vue)$/ }),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
