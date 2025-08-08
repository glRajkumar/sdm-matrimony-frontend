import { RefreshCcw } from "lucide-react";
import { format } from "date-fns";

import { useGetAllPayments } from "@/hooks/use-super-admin";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanBadge } from "@/components/common/plan-badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

import LoadMore from "@/components/common/load-more";

function UsersAllPayments() {
  const { isLoading, data, isFetching, hasNextPage, fetchNextPage, refetch } = useGetAllPayments()

  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle>Users All Payments</CardTitle>
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

        {
          !isLoading && data?.map(user => (
            <div key={user?._id} className="mb-2 p-4 border rounded-lg">
              <div className="df">
                <img
                  className="size-16 shrink-0 rounded object-cover"
                  src={user?.user?.profileImg || "/imgs/user.jpg"}
                  alt=""
                />

                <div className="flex-1">
                  <p>{user?.user?.fullName}</p>
                  <p className="text-xs text-muted-foreground">{user?.user?.email}</p>
                </div>

                <div className="font-medium">₹ {Number(user?.payments?.reduce((a, b) => a + b?.amount, 0)).toLocaleString()}</div>
              </div>

              <div className="p-2 mt-2 border rounded-lg">
                <table className="w-full table-fixed overflow-x-auto">
                  <thead>
                    <tr>
                      <th className="p-1 text-sm font-medium text-left">Plan</th>
                      <th className="p-1 text-sm font-medium text-right">Amount</th>
                      <th className="p-1 text-sm font-medium text-center">Expiry Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      user?.payments?.map(payment => (
                        <tr key={payment?._id} className="odd:bg-muted/60 text-sm">
                          <td className="p-1">
                            <div className="df">
                              <PlanBadge
                                subscribedTo={payment?.subscribedTo}
                                className="p-2"
                              />
                              <p className="capitalize">{payment?.subscribedTo}</p>
                            </div>
                          </td>

                          <td className="p-1 text-right">₹ {Number(payment?.amount).toLocaleString()}</td>

                          <td className="p-1 text-center">{format(new Date(payment?.expiryDate), "dd/MM/yyyy")}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>
          ))
        }

        {
          !isLoading && hasNextPage && !isFetching &&
          <LoadMore fn={fetchNextPage} />
        }
      </CardContent>
    </Card>
  )
}

export default UsersAllPayments
