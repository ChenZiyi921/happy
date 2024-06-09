import { request } from "@/utils/service"

export function loginApi(data) {
  return request({
    url: "/api/admin/login",
    method: "post",
    data
  })
}
