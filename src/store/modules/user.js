import { loginApi } from "@/api/login/index.js"
import { resetRouter } from "@/router/index.js"
import store from "@/store"
import { getToken, removeToken, setToken } from "@/utils/cache/cookies"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useSettingsStore } from "./settings"
import { useTagsViewStore } from "./tags-view"

export const useUserStore = defineStore("user", () => {
  const token = ref(getToken() || "")
  const roles = ref([])
  const account = ref("")

  const tagsViewStore = useTagsViewStore()
  const settingsStore = useSettingsStore()

  const login = async ({ account, password, code }) => {
    const { data } = await loginApi({ account, password, code })
    setToken(data.rcs_authcode)
    token.value = data.rcs_authcode
  }

  const getInfo = async () => {
    roles.value = ["admin"]
  }

  const changeRoles = async (role) => {
    const newToken = "token-" + role
    token.value = newToken
    setToken(newToken)

    window.location.reload()
  }

  const logout = () => {
    removeToken()
    token.value = ""
    roles.value = []
    resetRouter()
    _resetTagsView()
  }

  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }

  const _resetTagsView = () => {
    if (!settingsStore.cacheTagsView) {
      tagsViewStore.delAllVisitedViews()
      tagsViewStore.delAllCachedViews()
    }
  }

  return { token, roles, account, login, getInfo, changeRoles, logout, resetToken }
})

export function useUserStoreHook() {
  return useUserStore(store)
}
