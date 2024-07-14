import endPoints from "@/utils/endPoints";
import sendApiReq from "@/utils/sendApiReq";

export const signupUser = (data: any) => sendApiReq({
  isAuthendicated: false,
  url: endPoints.register,
  method: 'POST',
  data,
})

export const LoginUser = (data: any) => sendApiReq({
  isAuthendicated: false,
  url: endPoints.login,
  method: 'POST',
  data,
})

export const me = () => sendApiReq({
  url: endPoints.me,
})

export const logout = () => sendApiReq({
  url: endPoints.logout,
  method: 'POST'
})

export const getUsers = () => sendApiReq({
  url: endPoints.getUsers,
})

export const getUser = (id: string) => sendApiReq({
  url: `${endPoints.getUser}/${id}`,
})

export const imgUpload = (userData: any) => sendApiReq({
  url: endPoints.imgUpload,
  method: 'POST',
  data: { userData },
})