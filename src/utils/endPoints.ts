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

  getMatches: "/user/matches",
  imgUpload: "/user/imgupload",
  getUserDetails: "/users",

  getUsersList: "/admin/users",
  updateApproval: "/admin/approval",
};

export default endPoints;
