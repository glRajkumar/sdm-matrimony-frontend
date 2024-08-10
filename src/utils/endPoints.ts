export const root = {
  baseUrl: `http://localhost:5000`,
};

const endPoints = {
  register: "/users/register",
  login: "/users/login",
  me: "/users/me",
  logout: "/users/logout",
  getUsers: "/users/getusers",
  getUserDetails: "/users",
  imgUpload: "/users/imgupload",
  getMatches: "/users/matches",
  approvalRequest: "/users/get-approval",
  getPendingUsers: "/users/pending-user-list",
};

export default endPoints;
