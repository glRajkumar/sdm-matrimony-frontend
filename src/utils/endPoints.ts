export const root = {
  baseUrl: `http://localhost:5000/api`,
};

const endPoints = {
  register: "/user/register",
  login: "/user/login",
  forgotPass: "/user/forgot-pass",
  resetPass: "/user/reset-pass",
  logout: "/user/logout",

  me: "/user/me",
  getUsers: "/user/getusers",
  getUserDetails: "/users",
  imgUpload: "/user/imgupload",
  getMatches: "/user/matches",
  getPendingList: "/user/pending-user-list",
  updateApproval: "/user/approval",
};

export default endPoints;
