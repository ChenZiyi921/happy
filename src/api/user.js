import { request } from "@/utils/service.js"

export function departmentUserList(data) {
  return request({
    url: "/api/admin/user_list",
    method: "post",
    data
  })
}
