export const root = {
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL,
};

export const endPoints = {
  register: "/account/register",
  login: "/account/login",
  getAccessToken: "/account/access-token",
  forgotPass: "/account/forgot-pass",
  resetPass: "/account/reset-pass",
  registerImage: "/account/register-image",
  checkApprovalStatus: "/account/check-approval-status",
  logout: "/account/logout",
  me: "/account/me",

  resendVerifyEmail: "/account/resend-verify-email",
  verifyAccount: "/account/verify",

  getMatches: "/user/matches",
  getLikesList: "/user/likes-list",
  getUserDetails: "/user/profile",
  getPartnerPreferences: "/user/partner-preferences",
  addLiked: "/user/addliked",
  removeLiked: "/user/removeliked",
  updateProfile: "/user/profile",
  addImages: "/user/images",
  deleteImage: "/user/image",

  getUsersList: "/admin/users",
  updateUserDetails: "/admin/user",
  getMarriedUsers: "/admin/users/married",
  marriedTo: "/admin/user/married-to",
  findUser: "/admin/user/find",
  extractImg: "/extractor",

  createOrder: "/payment/create-order",
  verifyPayment: "/payment/verify",

  unlockProfile: "/user/unlock",
  getUnlockedProfiles: "/user/unlocked",
}
