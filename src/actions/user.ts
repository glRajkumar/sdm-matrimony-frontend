"use client";

import sendApiReq from "@/utils/sendApiReq";
import endPoints from "@/utils/endPoints";

export function signup(data: any) {
  return sendApiReq({
    isAuthendicated: false,
    url: endPoints.register,
    method: "POST",
    data,
  })
}

export function login(data: any) {
  return sendApiReq({
    isAuthendicated: false,
    url: endPoints.login,
    method: "POST",
    data,
  })
}

export function forgotPass(data: any) {
  return sendApiReq({
    method: "post",
    url: endPoints.forgotPass,
    data,
  })
}

export function resetPass(data: any) {
  return sendApiReq({
    method: "post",
    url: endPoints.resetPass,
    data,
  })
}

export function logout() {
  return sendApiReq({
    url: endPoints.logout,
    method: "POST",
    data: {}
  })
}

export function me() {
  return sendApiReq({
    url: endPoints.me,
  })
}

export function getUsers() {
  return sendApiReq({
    url: endPoints.getUsers,
  })
}

export function getUserDetails(id: string) {
  return sendApiReq({
    url: `${endPoints.getUserDetails}/${id}`,
  })
}

export function imgUpload(userData: any) {
  return sendApiReq({
    url: endPoints.imgUpload,
    method: "POST",
    data: { userData },
  })
}

export function getMatches(userData: any) {
  return sendApiReq({
    url: endPoints.getMatches,
    method: "GET",
    data: { userData },
  })
}

export function getPendingList() {
  return sendApiReq({
    url: endPoints.getPendingList,
  })
}

export function updateApproval(userData: any) {
  return sendApiReq({
    url: `${endPoints.updateApproval}/${userData?.id}`,
    method: "PUT",
    params: { userData },
  })
}
