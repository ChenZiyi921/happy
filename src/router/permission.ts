import routeSettings from "@/config/route"
import isWhiteList from "@/config/white-list"
import { setRouteChange } from "@/hooks/useRouteListener"
import { useTitle } from "@/hooks/useTitle"
import router from "@/router"
import { usePermissionStoreHook } from "@/store/modules/permission"
import { useUserStoreHook } from "@/store/modules/user"
import { getToken } from "@/utils/cache/cookies"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

const { setTitle } = useTitle()
NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  const userStore = useUserStoreHook()
  const permissionStore = usePermissionStoreHook()
  const token = getToken()

  if (!token) {
    if (isWhiteList(to)) return next()
    return next("/login")
  }

  if (to.path === "/login") {
    return next({ path: "/" })
  }

  if (userStore.roles.length !== 0) return next()

  await userStore.getInfo()
  const roles = ["admin"]
  routeSettings.dynamic ? permissionStore.setRoutes(roles) : permissionStore.setAllRoutes()
  permissionStore.addRoutes.forEach((route) => router.addRoute(route))
  next({ ...to, replace: true })
})

router.afterEach((to) => {
  setRouteChange(to)
  setTitle(to.meta.title)
  NProgress.done()
})
