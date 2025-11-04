import Link from "next/link";

import { useGetUsersGroupList } from "@/hooks/use-super-admin";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import LoadMore from "@/components/common/load-more";

type props = {
  date: string,
  createdBy: string
}

function List({ createdBy, date }: props) {
  const { isLoading, data, isFetching, hasNextPage, fetchNextPage } = useGetUsersGroupList({
    date,
    createdBy,
  })

  return (
    <>
      {
        isLoading &&
        <Skeleton className="h-72" />
      }

      {
        !isLoading && data?.map(u => (
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

            <Badge
              variant="outline"
              className="font-normal"
            >
              {u?.maritalStatus}
            </Badge>

            {
              (u?.isBlocked || u?.isDeleted) &&
              <Badge variant="destructive" className="font-normal">
                {u.isBlocked ? "Blocked" : "Deleted"}
              </Badge>
            }
          </div>
        ))
      }

      {
        !isLoading && hasNextPage && !isFetching &&
        <LoadMore fn={fetchNextPage} />
      }
    </>
  )
}

export default List
