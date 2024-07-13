import endPoints from "@/utils/endPoints";
import sendApiReq from "@/utils/sendApiReq";


export const signupUser = async (userData: any) => {
  return sendApiReq({
    isAuthendicated: false,
    url: endPoints.register,
    method: 'POST',
    data: userData,
  });
};

export const LoginUser = async (userData: any) => {
  return sendApiReq({
    isAuthendicated: false,
    url: endPoints.login,
    method: 'POST',
    data: userData,
  });
};

export const me = async () => {
  return sendApiReq({
    url: endPoints.me,
    method: 'GET',
    data: {},
  });
};

export const logout = async () => {
  return sendApiReq({
    url: endPoints.logout,
    method: 'POST'
  });
};

export const getUsers = async () => {
  return sendApiReq({
    url: endPoints.getUsers,
    method: 'GET',
    data: {},
  });
};

export const getUser = async (id: string) => {
  return sendApiReq({
    url: `${endPoints.getUser}/${id}`,
    method: 'GET',
    data: {},
  });
};

export const imgUpload = async (userData: any) => {
  return sendApiReq({
    url: endPoints.imgUpload,
    method: 'POST',
    data: { userData },
  });
};