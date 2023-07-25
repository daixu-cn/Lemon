import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import { resolve } from "path"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import progress from "vite-plugin-progress"
import viteCompression from "vite-plugin-compression"

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    }),
    progress(),
    viteCompression({ threshold: 10240 })
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  },
  build: {
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[hash].js",
        entryFileNames: "static/js/[hash].js",
        assetFileNames: "static/[ext]/[hash].[ext]",
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return id
              .toString()
              .split("node_modules/")[1]
              .split("/")[0]
              .toString()
          }
        }
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "@/assets/style/scss/_element-plus-theme.scss" as *;
          @import "@/assets/style/scss/_variables.scss";
          @import "@/assets/style/scss/_mixins.scss";
        `
      }
    }
  },
  server: {
    open: true,
    host: "0.0.0.0",
    port: 8080
  }
})
