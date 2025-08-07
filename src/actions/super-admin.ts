import { sendApiReq, endPoints } from "@/services";

export function getPaidUsers(params: any = {}) {
  return sendApiReq({
    url: endPoints.getPaidUsers,
    params,
  })
}

export function getAssistedSubscribedUsers(params: any = {}) {
  return sendApiReq({
    url: endPoints.getAssistedSubscribedUsers,
    params,
  })
}

export function getAllPayments(params: any = {}) {
  return sendApiReq({
    url: endPoints.getAllPayments,
    params,
  })
}

export function getUsersByCreatedBy(params: any = {}) {
  return sendApiReq({
    url: endPoints.getUsersByCreatedBy,
    params,
  })
}

export function getUsersStatsCreatedBy() {
  return sendApiReq({
    url: endPoints.getUsersStatsCreatedBy,
  })
}

export function getUsersStatsCreatedToday() {
  return sendApiReq({
    url: endPoints.getUsersStatsCreatedToday,
  })
}

export function getAdminsList() {
  return sendApiReq({
    url: endPoints.getAdminsList,
  })
}

export function createAdmin(data: any) {
  return sendApiReq({
    url: endPoints.updateAdmin,
    method: "post",
    data,
  })
}

export function updateAdmin({ _id, ...data }: any) {
  return sendApiReq({
    url: `${endPoints.updateAdmin}/${_id}`,
    method: "put",
    data,
  })
}
