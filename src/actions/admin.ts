import { sendApiReq, endPoints } from "@/services";

export function getUsersList(params: any = {}) {
  return sendApiReq({
    url: endPoints.getUsersList,
    params,
  })
}

export function getMarriedUsers(params: any = {}) {
  return sendApiReq({
    url: endPoints.getMarriedUsers,
    params,
  })
}

export function findUser(params: any = {}) {
  return sendApiReq({
    url: endPoints.findUser,
    params,
  })
}

export function createUsers(data: Partial<userT>[]) {
  return sendApiReq({
    url: endPoints.getUsersList,
    method: "post",
    data,
  })
}

export function updateUserDetails(data: Partial<userT>) {
  return sendApiReq({
    url: endPoints.updateUserDetails,
    method: "put",
    data,
  })
}

export function userMarriedTo(data: { _id: string, marriedTo: string }) {
  return sendApiReq({
    url: endPoints.marriedTo,
    method: "post",
    data,
  })
}

export function extractImg(data: FormData) {
  return sendApiReq({
    url: endPoints.extractImg,
    method: "post",
    data,
  })
}
