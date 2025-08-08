import { RefreshCcw } from "lucide-react";
import { format } from "date-fns";

import { useGetAssistedSubscribedUsers } from "@/hooks/use-super-admin";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanBadge } from "@/components/common/plan-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import LoadMore from "@/components/common/load-more";

function AssistedSubscribedUser() {
  const { isLoading, data, isFetching, hasNextPage, fetchNextPage, refetch } = useGetAssistedSubscribedUsers()

  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle>Assisted Subscribed User</CardTitle>
        <CardAction>
          <Button
            size="sm"
            variant="outline"
            onClick={() => refetch()}
          >
            <RefreshCcw className={isLoading || isFetching ? "animate-spin" : ""} />
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent className="max-h-80 py-4 overflow-y-auto">
        {
          isLoading &&
          <Skeleton className="h-72" />
        }

        <table className="w-full table-fixed overflow-x-auto">
          <thead>
            <tr className="text-left">
              <th className="w-40 px-1 py-2 text-sm font-medium">User</th>
              <th className="w-28 px-1 py-2 text-sm font-medium">Plan</th>
              <th className="w-32 pl-1 pr-4 py-2 text-sm font-medium text-right">Amount</th>
              <th className="w-24 px-1 py-2 text-sm font-medium text-center">Months</th>
              <th className="w-24 px-1 py-2 text-sm font-medium text-center">Expiry Date</th>
            </tr>
          </thead>

          <tbody>
            {
              !isLoading &&
              data
                ?.filter(user => user?.user)
                ?.map(user => (
                  <tr key={user?._id} className="mb-2 text-sm odd:bg-muted/60">
                    <td className="px-1 py-2">
                      <div className="df">
                        <img
                          className="size-10 shrink-0 rounded object-cover"
                          src={user?.user?.profileImg || "/imgs/user.jpg"}
                          alt=""
                        />
                        <div>
                          <p>{user?.user?.fullName}</p>
                          <p className="text-xs text-muted-foreground">{user?.user?.email}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-1 py-2">
                      <div className="df">
                        <PlanBadge
                          subscribedTo={user?.subscribedTo}
                          className="p-2"
                        />
                        <p className="capitalize">{user?.subscribedTo}</p>
                      </div>
                    </td>

                    <td className="pl-1 pr-4 py-2 text-right">₹ {Number(user?.amount).toLocaleString()}</td>

                    <td className="px-1 py-2 text-center">{user?.assistedMonths}</td>

                    <td className="px-1 py-2 text-center">{format(new Date(user?.assistedExpire), "dd-MM-yy")}</td>
                  </tr>
                ))
            }
          </tbody>
        </table>

        {
          !isLoading && hasNextPage && !isFetching &&
          <LoadMore fn={fetchNextPage} />
        }
      </CardContent>
    </Card>
  )
}

export default AssistedSubscribedUser
