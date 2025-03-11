"use client";

import { Loader } from "lucide-react";

import { useAddLiked, useRemoveLiked, useUsersList } from "@/hooks/use-user";
import useUIStore from "@/store/ui";

import LoadMore from "@/components/common/load-more";
import UserCard from "./user-card";

function Page() {
  const { data: users, isLoading, isFetching, hasNextPage, fetchNextPage } = useUsersList()
  const updateModal = useUIStore(s => s.update)

  const { mutate: unlikeMutate } = useRemoveLiked()
  const { mutate: likeMutate } = useAddLiked()

  const onAdd = (userId: string, type: "liked" | "disliked") => {
    likeMutate({ userId, type })
  }

  const onRemove = (userId: string, type: "liked" | "disliked") => {
    unlikeMutate({ userId, type })
  }

  const onView = (userId: string) => {
    updateModal({ open: "user-details", data: { _id: userId } })
  }

  if (isLoading) return (
    <div className='dc h-[calc(100vh-3rem)]'>
      <Loader className="animate-spin" />
    </div>
  )

  return (
    <section className="px-2 sm:px-4 py-8">
      {
        users?.map(user => (
          <UserCard
            key={user._id}
            {...user}
            onAdd={onAdd}
            onRemove={onRemove}
            onView={() => onView(user?._id as string)}
          />
        ))
      }

      {
        !isLoading && hasNextPage && !isFetching &&
        <LoadMore fn={fetchNextPage} />
      }

      {
        isFetching &&
        <div className="dc my-6">
          <Loader className="animate-spin" />
        </div>
      }
    </section>
  )
}

export default Page
