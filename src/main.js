import App from "@/App.vue"
import router from "@/router/index.js"
import "@/router/permission"
import store from "@/store/index.js"
import { createApp } from "vue"

import { loadDirectives } from "@/directives"
import { loadPlugins } from "@/plugins"

import "@/styles/index.scss"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "normalize.css"
import "uno.css"

const app = createApp(App)

loadPlugins(app)
loadDirectives(app)

app.use(store).use(router)
router.isReady().then(() => {
  app.mount("#app")
})
