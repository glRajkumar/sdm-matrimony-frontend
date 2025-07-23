"use client";

import { Loader } from "lucide-react";

import { useAddLiked, useRemoveLiked } from "@/hooks/use-user";
import useUIStore from "@/store/ui";

import LoadMore from "@/components/common/load-more";
import UserCard from "./user-card";

type prrops = {
  type: "liked" | "disliked" | "full"
  users: Partial<userT>[],
  isLoading: boolean,
  isFetching: boolean,
  hasNextPage: boolean,
  fetchNextPage: () => void
}

function List({ type, users, isLoading, isFetching, hasNextPage, fetchNextPage }: prrops) {
  const updateModal = useUIStore(s => s.update)

  const { mutate: unlikeMutate } = useRemoveLiked()
  const { mutate: likeMutate } = useAddLiked()

  const onAdd = (userId: string, type: "liked" | "disliked") => {
    likeMutate({ userId, type })
  }

  const onRemove = (userId: string, type: "liked" | "disliked") => {
    unlikeMutate({ userId, type })
  }

  const onView = (_id: string) => {
    updateModal({ open: "user-details", data: { _id } })
  }

  if (isLoading) return (
    <div className='dc h-[calc(100vh-3rem)]'>
      <Loader className="animate-spin" />
    </div>
  )

  if (users.length === 0) return (
    <section className="dc px-2 sm:px-4 py-8 h-[90vh]">
      No users found
    </section>
  )

  return (
    <section className="px-2 sm:px-4 py-8 w-full max-w-2xl mx-auto">
      {
        users?.map(user => (
          <UserCard
            key={user._id}
            {...user}
            type={type}
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

export default List
