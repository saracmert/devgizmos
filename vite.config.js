import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 8080
  },
  resolve: {
    alias: {
      'vue': 'vue/dist/vue.esm-bundler.js'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'vue-i18n'],
          bootstrap: ['bootstrap', '@popperjs/core'],
          crypto: ['js-md5', 'js-sha1', 'js-sha256', 'js-sha512'],
          editor: ['monaco-editor', '@monaco-editor/loader']
        }
      }
    }
  }
})