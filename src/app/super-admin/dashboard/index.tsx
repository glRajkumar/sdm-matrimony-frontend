import useUIStore from "@/store/ui";

import TodayUserCreationsCount from "./today-user-creations-count";
import AssistedSubscribedUser from "./assisted-subscribed-user";
import UserCreationsPerAdmin from "./user-creations-per-admin";
import UsersAllPayments from "./users-all-payments";
import CreateAdmin from "./create-admin";
import PaidUsers from "./paid-users";
import Admins from "./admins";

function Dashboard() {
  const open = useUIStore(s => s.open)

  return (
    <>
      <TodayUserCreationsCount />
      <UserCreationsPerAdmin />
      <PaidUsers />
      <AssistedSubscribedUser />
      <UsersAllPayments />
      <Admins />

      {
        open === "admin" &&
        <CreateAdmin />
      }
    </>
  )
}

export default Dashboard
