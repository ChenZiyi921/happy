import { cloneDeep, omit } from "lodash-es"
import {
  createRouter,
  createWebHashHistory,
  type RouteRecordNormalized,
  type RouteRecordRaw,
  type Router
} from "vue-router"

export const history = createWebHashHistory()

export const flatMultiLevelRoutes = (routes: RouteRecordRaw[]) => {
  const routesMirror = cloneDeep(routes)
  routesMirror.forEach((route) => {
    isMultipleRoute(route) && promoteRouteLevel(route)
  })
  return routesMirror
}

const isMultipleRoute = (route: RouteRecordRaw) => {
  const children = route.children
  if (children?.length) {
    return children.some((child) => child.children?.length)
  }
  return false
}

const promoteRouteLevel = (route: RouteRecordRaw) => {
  let router: Router | null = createRouter({
    history,
    routes: [route]
  })
  const routes = router.getRoutes()

  addToChildren(routes, route.children || [], route)
  router = null

  route.children = route.children?.map((item) => omit(item, "children") as RouteRecordRaw)
}

const addToChildren = (routes: RouteRecordNormalized[], children: RouteRecordRaw[], routeModule: RouteRecordRaw) => {
  children.forEach((child) => {
    const route = routes.find((item) => item.name === child.name)
    if (route) {
      routeModule.children = routeModule.children || []

      if (!routeModule.children.includes(route)) {
        routeModule.children.push(route)
      }

      if (child.children?.length) {
        addToChildren(routes, child.children, routeModule)
      }
    }
  })
}
