import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      '/api': { // 代理地址，前端请求地址
        target:'http://localhost:8080', // 代理目标地址，后端服务地址
        changeOrigin:true, // 是否改变请求头
        rewrite:path=>path.replace(/^\/api/,'') // 重写路径,将/api替换为空
      }
    }
  }
})
