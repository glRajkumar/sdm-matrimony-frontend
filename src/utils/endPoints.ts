export const root = {
  baseUrl: `http://localhost:5000/api`,
};

const endPoints = {
  register: "/account/register",
  login: "/account/login",
  forgotPass: "/account/forgot-pass",
  resetPass: "/account/reset-pass",
  logout: "/account/logout",
  me: "/account/me",

  getUsers: "/user/getusers",
  getUserDetails: "/users",
  imgUpload: "/user/imgupload",
  getMatches: "/user/matches",

  getPendingList: "/admin/users",
  updateApproval: "/admin/approval",
};

export default endPoints;
