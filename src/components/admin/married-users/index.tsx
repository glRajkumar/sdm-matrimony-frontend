"use client";

import { Loader } from "lucide-react";

import { useMarriedUsers } from "@/hooks/use-admin";

import GenLoader from "@/components/common/gen-loader";
import LoadMore from "@/components/common/load-more";

import UserCard, { Empty } from "./user-card";

type props = {
  role?: rolesT
}

function MarriedUsers({ role = "admin" }: props) {
  const { data: users, isLoading, isFetching, fetchNextPage, hasNextPage } = useMarriedUsers()

  function navigateTo(maleId: string, femaleId: string) {
    if (maleId && femaleId) {
      window.open(`/${role}/married/${maleId}_${femaleId}`)
    } else {
      window.open(`/${role}/user/${maleId || femaleId}`)
    }
  }

  if (isLoading) return (
    <GenLoader className="h-[calc(100vh-4rem)]" />
  )

  if (users?.length === 0) return (
    <section className="dc px-2 sm:px-4 py-8 h-[90vh]">
      No users found
    </section>
  )

  return (
    <div className="p-6">
      {
        !isLoading && users?.map(({ male, female }) => (
          <div
            key={male?._id || female?._id}
            className="grid md:grid-cols-2 gap-8 mb-12 max-w-4xl mx-auto relative cursor-pointer group"
            onClick={() => navigateTo(male?._id as string, female?._id as string)}
          >
            {male ? <UserCard {...male} /> : <Empty />}
            <span className="w-0.5 h-full md:h-0.5 md:w-full absolute top-0 left-1/2 -translate-x-1/2 md:top-1/2 md:left-0 md:translate-x-0 md:-translate-y-1/2 z-[-1] bg-border" />
            {female ? <UserCard {...female} /> : <Empty />}
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

export default MarriedUsers
