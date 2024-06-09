import { request } from "@/utils/service.js"

export function departmentCascade(data) {
  return request({
    url: "/api/department/cascade",
    method: "post",
    data
  })
}
