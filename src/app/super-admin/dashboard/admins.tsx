import { Plus } from "lucide-react";

import { useGetAdmins } from "@/hooks/use-super-admin";
import useUIStore from "@/store/ui";

import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

function Admins() {
  const update = useUIStore(s => s.update)

  const { isLoading, data } = useGetAdmins()

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle>Admins</CardTitle>
        <CardAction>
          <Button
            variant="outline"
            onClick={() => update({ open: "admin" })}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        {
          isLoading &&
          <Skeleton />
        }

        {
          !isLoading && data?.map(ad => (
            <div key={ad._id} className="mb-2">
              <p>{ad.fullName}</p>
              <p className="text-xs text-muted-foreground">{ad.email}</p>
            </div>
          ))
        }
      </CardContent>
    </Card>
  )
}

export default Admins
