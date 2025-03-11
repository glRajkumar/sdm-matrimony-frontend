"use client";

import { useLikesList } from "@/hooks/use-user";

import List from "../list";

function Page() {
  const { data: users, isLoading, isFetching, hasNextPage, fetchNextPage } = useLikesList("liked")

  return (
    <List
      type="liked"
      users={users || []}
      isLoading={isLoading}
      isFetching={isFetching}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  )
}

export default Page
