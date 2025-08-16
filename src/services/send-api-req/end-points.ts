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
  updatePassword: "/account/update-password",
  logout: "/account/logout",
  me: "/account/me",
  resendVerifyEmail: "/account/resend-verify-email",
  verifyAccount: "/account/verify",

  static: "/static",

  getMatches: "/user/matches",
  getLikesList: "/user/likes-list",
  getUserDetails: "/user/profile",
  getPartnerPreferences: "/user/partner-preferences",
  getAccountInfo: "/user/account-info",
  addLiked: "/user/addliked",
  removeLiked: "/user/removeliked",
  updateProfile: "/user/profile",
  addImages: "/user/images",
  deleteImage: "/user/image",
  unlockProfile: "/user/unlock",
  getUnlockedProfiles: "/user/unlocked",

  getUsersList: "/admin/users",
  updateUserDetails: "/admin/user",
  getMarriedUsers: "/admin/users/married",
  marriedTo: "/admin/user/married-to",
  findUser: "/admin/user/find",
  extractImg: "/extractor",

  createOrder: "/payment/create-order",
  verifyPayment: "/payment/verify",

  getPaidUsers: "/super-admin/users/paid",
  getAssistedSubscribedUsers: "/super-admin/users/assisted-subscribed",
  getAllPayments: "/super-admin/users/all-payments",
  getUsersByCreatedBy: "/super-admin/users/created-by",
  getUsersStatsCreatedBy: "/super-admin/users-stats/created-per-admin",
  getUsersStatsCreatedToday: "/super-admin/users-stats/created-today",
  getAdminsList: "/super-admin/admins",
  updateAdmin: "/super-admin/admin",
}
