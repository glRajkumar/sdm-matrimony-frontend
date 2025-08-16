"use client";

import { useGetAdmins } from "@/hooks/use-super-admin";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton";

import Users from "@/components/admin/users";

function Page() {
  const { isLoading, data } = useGetAdmins()

  return (
    <div className="p-8">
      {
        isLoading &&
        <Skeleton className="h-96" />
      }

      {
        !isLoading && data && data?.map(ad => (
          <Collapsible key={ad?._id} className="mb-8 border shadow-sm rounded-md">
            <CollapsibleTrigger className="w-full px-4 py-3 text-left cursor-pointer border-b">
              {ad?.fullName} {ad?.email}
            </CollapsibleTrigger>

            <CollapsibleContent className="p-6 max-h-96 overflow-y-auto">
              <Users
                role="super-admin"
                loaderHt="h-80"
                createdBy={ad?._id}
                approvalStatus="approved"
              />
            </CollapsibleContent>
          </Collapsible>
        ))
      }
    </div>
  )
}

export default Page
