import { RefreshCcw, Edit2, Plus } from "lucide-react";

import { useGetAdmins } from "@/hooks/use-super-admin";
import useUIStore from "@/store/ui";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

function Admins() {
  const update = useUIStore(s => s.update)

  const { isLoading, isFetching, data, refetch } = useGetAdmins()

  return (
    <Card className="gap-0">
      <CardHeader>
        <CardTitle>Admins</CardTitle>
        <CardAction>
          <Button
            size="sm"
            variant="outline"
            onClick={() => update({ open: "admin" })}
            className="mr-2"
          >
            <Plus className="h-4 w-4" />
            Add
          </Button>

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
            <div
              key={ad._id}
              className="mb-2 px-4 py-2 odd:bg-muted/60 even:border rounded-lg relative"
            >
              <p>{ad.fullName}</p>
              <p className="text-xs text-muted-foreground">{ad.email} {ad?.contactDetails?.mobile ? `(${ad?.contactDetails?.mobile})` : ""}</p>
              <Button
                size="icon"
                variant="outline"
                onClick={() => update({ open: "admin", data: ad })}
                className="size-7 p-0 absolute top-2 right-2 rounded-sm"
              >
                <Edit2 className="size-3" />
              </Button>
            </div>
          ))
        }
      </CardContent>
    </Card>
  )
}

export default Admins
