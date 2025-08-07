import { useGetUserCreationStatsToday } from "@/hooks/use-super-admin";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function TodayUserCreationsCount() {
  const { isLoading, data } = useGetUserCreationStatsToday()

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle>Today User Creations</CardTitle>
      </CardHeader>

      <CardContent>
        {
          isLoading &&
          <Skeleton />
        }

        {
          !isLoading && data?.map(ad => (
            <div key={ad?._id} className="df mb-2">
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
