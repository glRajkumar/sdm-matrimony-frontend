import { useState } from "react";
import { RefreshCcw } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

import { type uctT, useGetUserCreationStats } from "@/hooks/use-super-admin";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DatePicker } from "@/components/ui/date-picker";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function UserCard(ad: uctT) {
  const [show, setShow] = useState(false)

  return (
    <div className="mb-4 border rounded-lg bg-muted/40">
      <div
        className="df p-4 hover:bg-muted/60 cursor-pointer"
        onClick={() => setShow(p => !p)}
      >
        <div className="flex-1">
          <p>{ad?.fullName || "Individuals"}</p>
          {ad?.email && <p className="text-xs text-muted-foreground">{ad?.email}</p>}
        </div>

        <div className="font-medium">{ad?.created}</div>
      </div>

      {
        show &&
        <div className="pt-1 border-t">
          {
            ad?.users?.map(u => (
              <div
                key={u?._id}
                className="df py-1 px-4 even:bg-muted/80 hover:bg-primary/5"
              >
                <Link href={`/super-admin/user/${u?._id}`} className="df flex-1 cursor-pointer">
                  <img
                    className="size-10 shrink-0 rounded object-cover"
                    src={u?.profileImg || "/imgs/user.jpg"}
                    alt=""
                  />
                  <p className="flex-1 text-sm">{u?.fullName}</p>
                </Link>

                <Badge variant="outline" className="font-normal">{u?.maritalStatus}</Badge>
                {
                  (u?.isBlocked || u?.isDeleted) &&
                  <Badge variant="destructive" className="font-normal">
                    {u.isBlocked ? "Blocked" : "Deleted"}
                  </Badge>
                }
              </div>
            ))
          }
        </div>
      }
    </div>
  )
}

function UserCreations() {
  const [date, setDate] = useState(new Date())

  const { isLoading, isFetching, data, refetch } = useGetUserCreationStats(format(date, "yyyy-MM-dd"))

  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle>User Creations</CardTitle>

        <CardAction className="df">
          <DatePicker
            value={date}
            onChange={(date) => setDate(date || new Date())}
            className="w-28"
            calendarProps={{
              captionLayout: "dropdown",
              disabled(date) {
                return date > new Date()
              },
            }}
          />
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
          !isLoading && data?.map(ad => <UserCard key={ad._id} {...ad} />)
        }

        {
          !isLoading && data?.length === 0 && (
            <p className="dc h-60 text-center">No data found</p>
          )
        }
      </CardContent>
    </Card>
  )
}

export default UserCreations
