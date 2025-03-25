"use client";

import { Loader } from "lucide-react";

import { useMarriedUsers } from "@/hooks/use-admin";

import LoadMore from "@/components/common/load-more";
import UserCard from "./user-card";

function MarriedPage() {
  const { data: users, isLoading, isFetching, fetchNextPage, hasNextPage } = useMarriedUsers()

  if (isLoading) return (
    <div className='dc h-[calc(100vh-4rem)]'>
      <Loader className="animate-spin" />
    </div>
  )

  if (users?.length === 0) return (
    <section className="dc px-2 sm:px-4 py-8 h-[90vh]">
      No users found
    </section>
  )

  return (
    <div className="p-6">
      {
        !isLoading && users?.map(({ marriedTo, ...user }) => (
          <div key={user._id} className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto relative">
            <UserCard {...user} />
            <span className="w-0.5 h-full md:h-0.5 md:w-full absolute top-0 left-1/2 -translate-x-1/2 md:top-1/2 md:left-0 md:translate-x-0 md:-translate-y-1/2 z-[-1] bg-border" />
            <UserCard {...marriedTo} />
          </div>
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
    </div>
  )
}

export default MarriedPage
