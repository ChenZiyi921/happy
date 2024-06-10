import { SIDEBAR_CLOSED, SIDEBAR_OPENED } from "@/constants/app-key"
import { getSidebarStatus, setSidebarStatus } from "@/utils/cache/local-storage"
import { defineStore } from "pinia"
import { reactive, ref, watch } from "vue"

function handleSidebarStatus(opened) {
  opened ? setSidebarStatus(SIDEBAR_OPENED) : setSidebarStatus(SIDEBAR_CLOSED)
}

export const useAppStore = defineStore("app", () => {
  const sidebar = reactive({
    opened: getSidebarStatus() !== SIDEBAR_CLOSED,
    withoutAnimation: false
  })

  const device = ref("Desktop")

  watch(
    () => sidebar.opened,
    (opened) => handleSidebarStatus(opened)
  )

  const toggleSidebar = (withoutAnimation) => {
    sidebar.opened = !sidebar.opened
    sidebar.withoutAnimation = withoutAnimation
  }

  const closeSidebar = (withoutAnimation) => {
    sidebar.opened = false
    sidebar.withoutAnimation = withoutAnimation
  }

  const toggleDevice = (value) => {
    device.value = value
  }

  return { device, sidebar, toggleSidebar, closeSidebar, toggleDevice }
})
