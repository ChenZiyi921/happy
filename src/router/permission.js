import routeSettings from "@/config/route"
import isWhiteList from "@/config/white-list.js"
import { setRouteChange } from "@/hooks/useRouteListener"
import { useTitle } from "@/hooks/useTitle"
import router from "@/router/index.js"
import { usePermissionStoreHook } from "@/store/modules/permission"
import { useUserStoreHook } from "@/store/modules/user.js"
import { getToken } from "@/utils/cache/cookies"

const { setTitle } = useTitle()

router.beforeEach(async (to, _from, next) => {
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
})
