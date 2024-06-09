import { request } from "@/utils/service.js"

export function loginApi(data) {
  return request({
    url: "/api/admin/login",
    method: "post",
    data
  })
}
