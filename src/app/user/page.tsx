"use client";

import { useEffect, useRef, useState } from "react";

import { useUsersList } from "@/hooks/use-user";

import FilterSideBar from "./filter-sidebar";
import List from "./list";

function useKey(filterData: objT | undefined) {
  const [id, setId] = useState(() => crypto.randomUUID())
  const prevDataRef = useRef<objT | undefined>(filterData)

  useEffect(() => {
    const prev = prevDataRef.current
    const isChanged = JSON.stringify(prev) !== JSON.stringify(filterData)

    if (isChanged) {
      setId(crypto.randomUUID())
      prevDataRef.current = filterData
    }
  }, [filterData])

  return id
}

function Page() {
  const [filterData, setFilterData] = useState<objT | undefined>(undefined)
  const { data: users, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useUsersList(filterData)
  const id = useKey(filterData)

  function onSave(filterData: objT) {
    setFilterData(filterData)
  }

  return (
    <div className="md:grid grid-cols-[1fr] md:grid-cols-[300px_1fr] md:gap-4 relative">
      <FilterSideBar
        hasFilters={filterData ? Object.keys(filterData).length > 0 : false}
        onSave={onSave}
      />

      <List
        key={id}
        type="full"
        users={users || []}
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        fetchNextPage={fetchNextPage}
      />
    </div>
  )
}

export default Page
