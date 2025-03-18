"use client";

import { useState } from "react";

import { useUsersList } from "@/hooks/use-user";

import Filters from "./filters";
import List from "./list";

function Page() {
  const [filterData, setFilterData] = useState<objT>({})
  const { data: users, isLoading, isFetching, hasNextPage, fetchNextPage } = useUsersList(filterData)

  function onSave(filterData: objT) {
    setFilterData(filterData)
  }

  return (
    <div className="grid grid-cols-[300px_1fr] gap-4">
      <Filters onSave={onSave} />

      <List
        type="full"
        users={users || []}
        isLoading={isLoading}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  )
}

export default Page
