import { sendApiReq, endPoints } from "@/services";

export function signup(data: any) {
  return sendApiReq({
    isAuthendicated: false,
    url: endPoints.register,
    method: "POST",
    data,
  })
}

export function registerImage(data: any) {
  return sendApiReq({
    isAuthendicated: false,
    method: "post",
    url: endPoints.registerImage,
    data,
  })
}

export function login(data: any) {
  return sendApiReq({
    isAuthendicated: false,
    withCredentials: true,
    url: endPoints.login,
    method: "POST",
    data,
  })
}

export function checkApprovalStatus() {
  return sendApiReq({
    url: endPoints.checkApprovalStatus,
    withCredentials: true,
  })
}

export function forgotPass(data: any) {
  return sendApiReq({
    isAuthendicated: false,
    method: "post",
    url: endPoints.forgotPass,
    data,
  })
}

export function resetPass(data: any) {
  return sendApiReq({
    isAuthendicated: false,
    method: "post",
    url: endPoints.resetPass,
    data,
  })
}

export function verifyAccount(data: any) {
  return sendApiReq({
    isAuthendicated: false,
    method: "post",
    url: endPoints.verifyAccount,
    data,
  })
}

export function resendVerifyEmail(data: any) {
  return sendApiReq({
    method: "post",
    url: endPoints.resendVerifyEmail,
    data,
  })
}

export function logout() {
  return sendApiReq({
    withCredentials: true,
    url: endPoints.logout,
    method: "POST",
    data: {}
  })
}

export function userDetailsMini() {
  return sendApiReq({
    url: endPoints.userDetailsMini,
  })
}

export function updatePassword(data: { oldPassword: string, newPassword: string }) {
  return sendApiReq({
    url: endPoints.updatePassword,
    method: "PUT",
    data,
  })
}

export function updateMobile(data: { mobile: string }) {
  return sendApiReq({
    url: endPoints.updateMobile,
    method: "PUT",
    data,
  })
}

export function updateEmail(data: { email: string }) {
  return sendApiReq({
    url: endPoints.updateEmail,
    method: "PUT",
    data,
  })
}