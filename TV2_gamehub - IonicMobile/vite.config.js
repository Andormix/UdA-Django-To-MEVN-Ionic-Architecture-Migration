import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/mevn-api": 
      {
        target: process.env.MEVN_PROXY_TARGET || "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mevn-api/, "/api")
      },
      "/django-api": 
      {
        target: process.env.DJANGO_PROXY_TARGET || "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/django-api/, "/api")
      }
    }
  }
});
