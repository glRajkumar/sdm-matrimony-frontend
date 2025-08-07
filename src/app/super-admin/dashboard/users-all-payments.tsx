import { Loader } from "lucide-react";
import { format } from "date-fns";

import { useGetAllPayments } from "@/hooks/use-super-admin";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlanBadge } from "@/components/common/plan-badge";
import { Skeleton } from "@/components/ui/skeleton";
import LoadMore from "@/components/common/load-more";

function UsersAllPayments() {
  const { isLoading, data, isFetching, fetchNextPage, hasNextPage } = useGetAllPayments()

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle>Users All Payments</CardTitle>
      </CardHeader>

      <CardContent>
        {
          isLoading &&
          <Skeleton />
        }

        {
          !isLoading && data?.map(user => (
            <div key={user?._id} className="mb-2 p-2 border rounded">
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

              <div className="p-2 mt-2 border rounded-lg">
                {
                  user?.payments?.map(payment => (
                    <div key={payment?._id} className="df">
                      <div className="df">
                        <PlanBadge
                          subscribedTo={payment?.subscribedTo}
                          className="p-2"
                        />
                        <p className="capitalize">{payment?.subscribedTo}</p>
                      </div>

                      <div>
                        <p>{format(new Date(payment?.expiryDate), "dd/MM/yyyy")}</p>
                        <p>{payment?.amount}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))
        }

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

export default UsersAllPayments
