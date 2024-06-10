import ElementPlus from "element-plus"
import { type App } from "vue"

export function loadElementPlus(app: App) {
  app.use(ElementPlus)
}
