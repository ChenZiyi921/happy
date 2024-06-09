import { request } from "@/utils/service"

export function departmentCascade(data) {
  return request({
    url: "/api/department/cascade",
    method: "post",
    data
  })
}
