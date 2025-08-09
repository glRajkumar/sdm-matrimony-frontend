import { RefreshCcw } from "lucide-react";

import { useGetUserCreationStatsPerAdmin } from "@/hooks/use-super-admin";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

function UserCreationsPerAdmin() {
  const { isLoading, isFetching, data, refetch } = useGetUserCreationStatsPerAdmin()

  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle>User Creations Per Admin</CardTitle>
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

      <CardContent className="max-h-80 py-4 overflow-auto">
        {
          isLoading &&
          <Skeleton className="h-72" />
        }

        {
          !isLoading && data?.map(ad => (
            <div key={ad?._id} className="mb-2 p-4 border rounded-xl">
              <div className="df justify-between">
                <div>
                  <p>{ad?.fullName}</p>
                  <p className="text-xs text-muted-foreground">{ad?.email}</p>
                </div>

                <div>{Object?.values(ad?.dates)?.reduce((a, b) => a + b, 0)}</div>
              </div>

              <ul className="mt-2 df flex-wrap">
                {
                  Object.entries(ad?.dates).map(([date, count]) => (
                    <li key={date} className="df justify-between px-2 py-1 text-xs border rounded-full bg-muted/20">
                      <p>{date} :</p>
                      <p className="font-medium">{count}</p>
                    </li>
                  ))
                }
              </ul>
            </div>
          ))
        }
      </CardContent>
    </Card>
  )
}

export default UserCreationsPerAdmin
