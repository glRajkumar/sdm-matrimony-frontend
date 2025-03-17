export const root = {
  baseUrl: `http://localhost:5000/api`,
};

export const endPoints = {
  register: "/account/register",
  login: "/account/login",
  forgotPass: "/account/forgot-pass",
  resetPass: "/account/reset-pass",
  registerImage: "/account/register-image",
  logout: "/account/logout",
  me: "/account/me",
  checkApprovalStatus: "/account/check-approval-status",

  getMatches: "/user/matches",
  getLikesList: "/user/likes-list",
  getUserDetails: "/user/profile",
  addLiked: "/user/addliked",
  removeLiked: "/user/removeliked",
  updateProfile: "/user/profile",
  addImages: "/user/images",

  getUsersList: "/admin/users",
  updateUserDetails: "/admin/user",
}
