"use client";

import { useUsersList } from "@/hooks/use-user";

import List from "./list";

function Page() {
  const { data: users, isLoading, isFetching, hasNextPage, fetchNextPage } = useUsersList()

  return (
    <List
      type="full"
      users={users || []}
      isLoading={isLoading}
      isFetching={isFetching}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
    />
  )
}

export default Page
