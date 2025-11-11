"use client";

import { useUserDetailsMini } from "@/hooks/use-account";

import { Skeleton } from "@/components/ui/skeleton";
import Users from "@/components/admin/users";

function Page() {
  const { data: user, isLoading } = useUserDetailsMini()

  return (
    <section className="px-2 sm:px-4 pt-4 sm:pt-8">
      {
        isLoading &&
        <Skeleton className="h-[70vh]" />
      }

      {
        !isLoading && user &&
        <Users
          createdBy={user?._id}
          approvalStatus="approved"
          loaderHt="h-[calc(100vh-12rem)] sm:h-[calc(100vh-10rem)]"
        />
      }
    </section>
  )
}

export default Page
