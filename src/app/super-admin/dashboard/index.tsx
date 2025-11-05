import useUIStore from "@/store/ui";

import AssistedSubscribedUser from "./assisted-subscribed-user";
import UsersGroupedByAdmin from "./users-grouped-by-admin";
import UsersAllPayments from "./users-all-payments";
import UsersGrouped from "./users-grouped";
import CreateAdmin from "./create-admin";
import PaidUsers from "./paid-users";
import Admins from "./admins";

function Dashboard() {
  const open = useUIStore(s => s.open)

  return (
    <>
      <UsersGrouped />
      <UsersGroupedByAdmin />
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
