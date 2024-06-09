import { request } from "@/utils/service"

export function departmentUserList(data) {
  return request({
    url: "/api/admin/user_list",
    method: "post",
    data
  })
}
