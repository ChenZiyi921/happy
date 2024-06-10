import { layoutSettings } from "@/config/layouts.js"
import { setConfigLayout } from "@/utils/cache/local-storage"
import { defineStore } from "pinia"
import { ref, watch } from "vue"

export const useSettingsStore = defineStore("settings", () => {
  const state = {}

  for (const [key, value] of Object.entries(layoutSettings)) {
    const refValue = ref(value)

    state[key] = refValue

    watch(refValue, () => {
      const settings = _getCacheData()
      setConfigLayout(settings)
    })
  }

  const _getCacheData = () => {
    const settings = {}
    for (const [key, value] of Object.entries(state)) {
      settings[key] = value.value
    }
    return settings
  }

  return state
})
