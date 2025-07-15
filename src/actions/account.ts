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
