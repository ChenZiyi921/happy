import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import path, { resolve } from "path"
import UnoCSS from "unocss/vite"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import svgLoader from "vite-svg-loader"
export default ({ mode }) => {
  return {
    base: "",
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src")
      }
    },
    server: {
      host: true, // host: "0.0.0.0"
      port: 3333,
      open: false,
      cors: true,
      strictPort: false,
      proxy: {
        "/api/": {
          target: "http://back.rchang.cn",
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            "^/api": "/"
          }
        }
      },
      warmup: {
        clientFiles: ["./src/layouts/**/*.vue"]
      }
    },
    build: {
      chunkSizeWarningLimit: 2048,
      reportCompressedSize: false,
      assetsDir: "static",
      rollupOptions: {
        output: {
          manualChunks: {
            vue: ["vue", "vue-router", "pinia"],
            element: ["element-plus", "@element-plus/icons-vue"]
          }
        }
      }
    },
    esbuild:
      mode === "development"
        ? undefined
        : {
            pure: ["console.log"],
            drop: ["debugger"],
            legalComments: "none"
          },
    plugins: [
      vue(),
      vueJsx(),
      svgLoader({ defaultImport: "url" }),
      createSvgIconsPlugin({
        iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
        symbolId: "icon-[dir]-[name]"
      }),
      UnoCSS()
    ]
  }
}
