// core
import App from "@/App.vue"
import router from "@/router"
import "@/router/permission"
import store from "@/store"
import { createApp } from "vue"
// load
import { loadDirectives } from "@/directives"
import { loadPlugins } from "@/plugins"
// css
import "@/styles/index.scss"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import "normalize.css"
import "uno.css"

const app = createApp(App)

/** 加载插件 */
loadPlugins(app)
/** 加载自定义指令 */
loadDirectives(app)

app.use(store).use(router)
router.isReady().then(() => {
  app.mount("#app")
})
