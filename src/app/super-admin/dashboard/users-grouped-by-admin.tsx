import { useState } from "react";
import { RefreshCcw } from "lucide-react";

import { useGetUsersGroupedByAdminCount } from "@/hooks/use-super-admin";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SelectWrapper } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

function groupData(data: Record<string, number>, dateType: "day" | "month" | "caste") {
  if (dateType === "day" || dateType === "caste") return Object.entries(data).map(([key, value]) => ({ key, value }))

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

function UsersGroupedByAdmin() {
  const [type, setType] = useState<"date" | "caste">("date")
  const { isLoading, isFetching, data, refetch } = useGetUsersGroupedByAdminCount(type)
  const [dateType, setdateType] = useState<"day" | "month">("day")

  const datesOpts: optionsT = [
    { value: "day", label: "Day" },
    { value: "month", label: "Month" },
  ]

  const typesOpts: optionsT = [
    { value: "date", label: "Date" },
    { value: "caste", label: "Caste" },
  ]

  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle>Users Count by Admin</CardTitle>
        <CardAction className="df">
          <SelectWrapper
            value={type}
            options={typesOpts}
            placeholder="Select type"
            onValueChange={v => setType(v as "date" | "caste")}
          />

          {
            type === "date" &&
            <SelectWrapper
              value={dateType}
              options={datesOpts}
              placeholder="Select date type"
              onValueChange={v => setdateType(v as "day" | "month")}
            />
          }

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
                  <p>{ad?.fullName || "Individual"}</p>
                  {ad?.email && <p className="text-xs text-muted-foreground">{ad?.email}</p>}
                </div>

                <div>{Object?.values(ad?.data)?.reduce((a, b) => a + b, 0)}</div>
              </div>

              <ul className="mt-2 df flex-wrap">
                {
                  ad?.data && groupData(ad?.data, type === "date" ? dateType : type)
                    .sort((a, b) => a.key.localeCompare(b.key))
                    .map(v => (
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

export default UsersGroupedByAdmin
