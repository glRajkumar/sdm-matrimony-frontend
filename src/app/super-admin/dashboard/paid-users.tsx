import { Loader } from "lucide-react";
import { format } from "date-fns";

import { useGetPaidUsers } from "@/hooks/use-super-admin";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanBadge } from "@/components/common/plan-badge";
import { Skeleton } from "@/components/ui/skeleton";
import LoadMore from "@/components/common/load-more";

function PaidUsers() {
  const { isLoading, data, isFetching, fetchNextPage, hasNextPage } = useGetPaidUsers()

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle>Paid Users</CardTitle>
      </CardHeader>

      <CardContent>
        {
          isLoading &&
          <Skeleton />
        }

        <table className="w-full table-fixed">
          <thead>
            <tr className=" text-left">
              <th>User</th>
              <th>Plan</th>
              <th>Amount</th>
              <th>Expiry Date</th>
            </tr>
          </thead>

          <tbody>
            {
              !isLoading &&
              data
                ?.filter(user => user?.user)
                ?.map(user => (
                  <tr key={user?._id} className="mb-2">
                    <td>
                      <div className="df">
                        <img
                          className="size-16 shrink-0 rounded object-cover"
                          src={user?.user?.profileImg || "/imgs/user.jpg"}
                          alt=""
                        />
                        <div>
                          <p>{user?.user?.fullName}</p>
                          <p className="text-xs text-muted-foreground">{user?.user?.email}</p>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="df">
                        <PlanBadge
                          subscribedTo={user?.subscribedTo}
                          className="p-2"
                        />
                        <p className="capitalize">{user?.subscribedTo}</p>
                      </div>
                    </td>
                    <td>{user?.amount}</td>
                    <td>{format(new Date(user?.expiryDate), "dd/MM/yyyy")}</td>
                  </tr>
                ))
            }
          </tbody>
        </table>

        {
          !isLoading && hasNextPage && !isFetching &&
          <LoadMore fn={fetchNextPage} />
        }

        {
          isFetching &&
          <div className="dc my-6">
            <Loader className="animate-spin" />
          </div>
        }
      </CardContent>
    </Card>
  )
}

export default PaidUsers
