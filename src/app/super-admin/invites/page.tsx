"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import {
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useGetNotInvitedUsers } from "@/hooks/use-super-admin";
import { useUserFilters } from "@/hooks/use-user-filters";

import { ColumnToggle, DataTableVirtualized } from "@/components/ui/data-table";
import UsersFiltersRow from "@/components/common/users-filters-row";

import { columns } from "./columns";

function Page() {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])

  const { final, methods, onReset, onSubmit } = useUserFilters({
    maritalStatus: [],
    fullName: "",
    gender: [],
    caste: [],
  })

  const { isLoading, data, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useGetNotInvitedUsers(final)

  const table = useReactTable({
    data: data as any || [],
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="dfc h-[calc(100vh-5rem)]">
      <UsersFiltersRow
        methods={methods}
        needReset={!!final && Object.keys(final)?.length > 0}
        isLoading={isLoading || isFetching}
        onSubmit={onSubmit}
        onReset={onReset}
        onRefresh={refetch}
        className="py-3 px-4 md:px-8 shadow"
      >
        <ColumnToggle table={table} />
      </UsersFiltersRow>

      {
        isLoading ?
          <div className="dc scroll-y">
            <Loader className="animate-spin" />
          </div>
          : <DataTableVirtualized
            table={table}
            className="mt-4 px-4 md:px-8 scroll-y [&_th:nth-child(-n+3)]:min-w-60"
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
      }
    </div>
  )
}

export default Page
