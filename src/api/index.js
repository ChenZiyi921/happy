import { request } from "@/utils/service.js"

export function uploadImage(data) {
  return request({
    url: "/api/upload/pic",
    method: "post",
    data,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}
