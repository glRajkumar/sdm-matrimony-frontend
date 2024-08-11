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
  getPendingList: "/users/pending-user-list",
  updateApproval: "/users/approval",
};

export default endPoints;
