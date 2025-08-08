import { RefreshCcw } from "lucide-react";

import { useGetUserCreationStatsToday } from "@/hooks/use-super-admin";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

function TodayUserCreationsCount() {
  const { isLoading, isFetching, data, refetch } = useGetUserCreationStatsToday()

  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle>Today User Creations</CardTitle>
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
          !isLoading && data?.map(ad => (
            <div key={ad?._id} className="df mb-2 p-4 odd:bg-muted/60 even:border rounded-lg">
              <div className="flex-1">
                <p>{ad?.fullName}</p>
                <p className="text-xs text-muted-foreground">{ad?.email}</p>
              </div>

              <div className="font-medium">{ad?.created}</div>
            </div>
          ))
        }
      </CardContent>
    </Card>
  )
}

export default TodayUserCreationsCount
