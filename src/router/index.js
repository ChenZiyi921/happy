import routeSettings from "@/config/route"
import { createRouter } from "vue-router"
import { flatMultiLevelRoutes, history } from "./helper"

const Layouts = () => import("@/layouts/index.vue")

export const constantRoutes = [
  {
    path: "/404",
    component: () => import("@/views/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      hidden: true
    }
  }
]

export const dynamicRoutes = [
  {
    path: "/",
    component: Layouts,
    redirect: "/department",
    meta: {
      title: "组织架构",
      svgIcon: "dashboard"
    },
    children: [
      {
        path: "department",
        component: () => import("@/views/dashboard/index.vue"),
        name: "department",
        meta: {
          title: "部门员工",

        }
      },
      {
        path: "role",
        component: () => import("@/views/dashboard/index.vue"),
        name: "role",
        meta: {
          title: "角色管理",

        }
      },
      {
        path: "auth",
        component: () => import("@/views/dashboard/index.vue"),
        name: "auth",
        meta: {
          title: "权限管理",

        }
      }
    ]
  },
  {
    path: "/unocss",
    component: Layouts,
    redirect: "/unocss/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/unocss/index.vue"),
        name: "UnoCSS",
        meta: {
          title: "UnoCSS",
          svgIcon: "unocss"
        }
      }
    ]
  }
]

const router = createRouter({
  history,
  routes: routeSettings.thirdLevelRouteCache ? flatMultiLevelRoutes(constantRoutes) : constantRoutes
})

export function resetRouter() {
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch {
    window.location.reload()
  }
}

export default router
