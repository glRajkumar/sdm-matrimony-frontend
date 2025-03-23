"use client";

import { useState } from "react";

import { useUsersList } from "@/hooks/use-user";

import FilterSideBar from "./filter-sidebar";
import List from "./list";

function Page() {
  const [filterData, setFilterData] = useState<objT>({})
  const { data: users, isLoading, isFetching, hasNextPage, fetchNextPage } = useUsersList(filterData)

  function onSave(filterData: objT) {
    setFilterData(filterData)
  }

  return (
    <div className="md:grid grid-cols-[1fr] md:grid-cols-[300px_1fr] md:gap-4">
      <FilterSideBar
        hasFilters={Object.keys(filterData).length > 0}
        onSave={onSave}
      />

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
