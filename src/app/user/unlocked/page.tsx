"use client";

import { useUnlockedProfiles } from "@/hooks/use-user";

import List from "../list";

function Page() {
  const { data: users, isLoading, isFetching } = useUnlockedProfiles()

  return (
    <List
      type="full"
      users={users || []}
      isLoading={isLoading}
      isFetching={isFetching}
      hasNextPage={false}
      fetchNextPage={() => { }}
    />
  )
}

export default Page
