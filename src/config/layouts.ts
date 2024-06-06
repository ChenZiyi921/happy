import { getConfigLayout } from "@/utils/cache/local-storage"

const defaultSettings = {
  layoutMode: "left",
  fixedHeader: true,
  showLogo: true
}

export const layoutSettings = { ...defaultSettings, ...getConfigLayout() }
