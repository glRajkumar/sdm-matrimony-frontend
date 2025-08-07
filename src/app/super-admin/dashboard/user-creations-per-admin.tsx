
import { useGetUserCreationStatsPerAdmin } from "@/hooks/use-super-admin";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

function UserCreationsPerAdmin() {
  const { isLoading, data } = useGetUserCreationStatsPerAdmin()

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Creations Per Admin</CardTitle>
      </CardHeader>

      <CardContent>
        {
          isLoading &&
          <Skeleton />
        }

        {
          !isLoading && data?.map(ad => (
            <div key={ad?._id} className="mb-2 p-4 border rounded-xl">
              <div className="df justify-between">
                <p>{ad?.fullName}</p>
                <p className="text-xs text-muted-foreground">{ad?.email}</p>
              </div>
              <ul className="mt-2">
                {
                  Object.entries(ad?.dates).map(([date, count]) => (
                    <li key={date} className="df justify-between">
                      <p>{date}</p>
                      <p>{count}</p>
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
