import { useState } from "react";
import { RefreshCcw } from "lucide-react";

import { useGetUserCreationStatsPerAdmin } from "@/hooks/use-super-admin";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

function groupData(data: Record<string, number>, type: "day" | "month") {
  if (type === "day") return Object.entries(data).map(([key, value]) => ({ key, value }))

  const result: { key: string; value: number }[] = []
  const indexMap: Record<string, number> = {}

  for (const [dateStr, value] of Object.entries(data)) {
    const [, month, year] = dateStr.split("-")
    const key = `${month}-${year}`

    if (indexMap[key] !== undefined) {
      result[indexMap[key]].value += value
    } else {
      indexMap[key] = result.length
      result.push({ key, value })
    }
  }

  return result
}

function UserCreationsPerAdmin() {
  const { isLoading, isFetching, data, refetch } = useGetUserCreationStatsPerAdmin()
  const [type, setType] = useState<"day" | "month">("day")

  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle>User Creations Per Admin</CardTitle>
        <CardAction className="df">
          <Select
            value={type}
            onValueChange={v => setType(v as "day" | "month")}
          >
            <SelectTrigger size="sm">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>

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
                  ad?.dates && groupData(ad?.dates, type).map(v => (
                    <li key={v.key} className="df justify-between px-2 py-1 text-xs border rounded-full bg-muted/20">
                      <p>{v.key} :</p>
                      <p className="font-medium">{v.value}</p>
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
