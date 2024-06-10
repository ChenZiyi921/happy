import { loginApi } from "@/api/login/index.js"
import { resetRouter } from "@/router/index.js"
import store from "@/store/index.js"
import { getToken, removeToken, setToken } from "@/utils/cache/cookies"
import { defineStore } from "pinia"
import { ref } from "vue"
import { useSettingsStore } from "./settings.js"

export const useUserStore = defineStore("user", () => {
  const token = ref(getToken() || "")
  const roles = ref([])
  const account = ref("")

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
  }

  const resetToken = () => {
    removeToken()
    token.value = ""
    roles.value = []
  }

  return { token, roles, account, login, getInfo, changeRoles, logout, resetToken }
})

export function useUserStoreHook() {
  return useUserStore(store)
}
