import { DeviceEnum } from "@/constants/app-key"
import { useAppStore } from "@/store/modules/app"
import { computed } from "vue"

const appStore = useAppStore()
const isDesktop = computed(() => appStore.device === DeviceEnum.Desktop)

export function useDevice() {
  return { isDesktop }
}
