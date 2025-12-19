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

export function getUsersGroupedByAdminCount(type: "date" | "caste" = "date") {
  return sendApiReq({
    url: endPoints.getUsersGroupedByAdminCount,
    params: { type },
  })
}

export function getUsersGroupedCount(params: any = {}) {
  return sendApiReq({
    url: endPoints.getUsersGroupedCount,
    params,
  })
}

export function getUsersGroupList(params: any = {}) {
  return sendApiReq({
    url: endPoints.getUsersGroupedList,
    params,
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

export function getNotInvitedUsers(params: any = {}) {
  return sendApiReq({
    url: endPoints.getNotInvitedUsers,
    params,
  })
}

export function userInvited({ _id }: { _id: string }) {
  return sendApiReq({
    url: `${endPoints.inviteUser}/${_id}`,
    method: "put",
  })
}

export function resetPassByAdmin({ _id, password }: { _id: string, password: string }) {
  return sendApiReq({
    url: `${endPoints.resetPassByAdmin}/${_id}`,
    method: "put",
    data: { password },
  })
}

export function makePaymentForUser(data: Omit<currentPlanT, "createdAt" | "expiryDate">) {
  return sendApiReq({
    url: endPoints.makePaymentForUser,
    method: "post",
    data,
  })
}