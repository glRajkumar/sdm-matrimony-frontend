"use client";

import { useLikesList } from "@/hooks/use-user";

import List from "../list";

function Page() {
  const { data: users, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } = useLikesList("liked")

  return (
    <List
      type="liked"
      users={users || []}
      isLoading={isLoading}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
      fetchNextPage={fetchNextPage}
    />
  )
}

export default Page
