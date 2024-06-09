import { useUserStoreHook } from "@/store/modules/user"
import axios from "axios"
import { ElMessage } from "element-plus"
import { merge } from "lodash-es"
import { getToken } from "./cache/cookies"

function logout() {
  useUserStoreHook().logout()
  location.reload()
}

function createService() {
  const service = axios.create()
  service.interceptors.request.use(
    (config) => config,
    (error) => Promise.reject(error)
  )
  service.interceptors.response.use(
    (response) => {
      const apiData = response.data
      const responseType = response.request?.responseType
      if (responseType === "blob" || responseType === "arraybuffer") return apiData

      const code = apiData.code_status

      switch (code) {
        case 0:
          return apiData
        case 401:
          return logout()
        default:
          ElMessage.error(apiData.msg)
          return Promise.reject(new Error("Error"))
      }
    },
    (error) => {
      ElMessage.error(error.message)
      return Promise.reject(error)
    }
  )
  return service
}

function createRequest(service) {
  return function (config) {
    const token = getToken()
    const defaultConfig = {
      headers: {
        Authorization: token ? `Bearer ${token}` : undefined,
        "Content-Type": "application/json"
      },
      timeout: 5000,
      baseURL: "",
      data: {}
    }
    const mergeConfig = merge(defaultConfig, config)
    return service(mergeConfig)
  }
}

const service = createService()
export const request = createRequest(service)
