import { useState } from "react";
import { RefreshCcw } from "lucide-react";
import { format } from "date-fns";

import { useGetUsersGroupedCount } from "@/hooks/use-super-admin";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DatePicker } from "@/components/ui/date-picker";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import List from "./list";

function UsersGrouped() {
  const [date, setDate] = useState(new Date())

  const { isLoading, isFetching, data, refetch } = useGetUsersGroupedCount({
    date: format(date, "yyyy-MM-dd"),
  })

  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle>Users Grouped</CardTitle>

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
          !isLoading && data?.map(ad => (
            <Collapsible key={ad._id} className="mb-4 border rounded-lg overflow-hidden">
              <CollapsibleTrigger asChild>
                <div className="df px-4 py-3 bg-muted/40 cursor-pointer rounded-none">
                  <div className="flex-1">
                    <p>{ad?.fullName || "Individuals"}</p>
                    {ad?.email && <p className="text-xs text-muted-foreground">{ad?.email}</p>}
                  </div>

                  <div className="font-medium">{ad?.created}</div>
                </div>
              </CollapsibleTrigger>

              <CollapsibleContent className=" border-t">
                <List createdBy={ad._id} date={format(date, "yyyy-MM-dd")} />
              </CollapsibleContent>
            </Collapsible>
          ))
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

export default UsersGrouped
