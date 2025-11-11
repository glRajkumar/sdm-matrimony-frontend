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

import { useUserFilters, type findUserSchemaT } from "@/hooks/use-user-filters";
import { useUsersList } from '@/hooks/use-admin';
import { cn } from "@/lib/utils";

import { ColumnToggle, DataTableVirtualized } from "@/components/ui/data-table";
import { columns } from "./columns";

import UsersFiltersRow from "@/components/common/users-filters-row";

function Users({ role = "admin", loaderHt = "h-[calc(100vh-16rem)] sm:h-[calc(100vh-14rem)]", ...props }: findUserSchemaT & { role?: rolesT, loaderHt?: string }) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [sorting, setSorting] = useState<SortingState>([])

  const { final, methods, onReset, onSubmit } = useUserFilters({
    maritalStatus: [],
    fullName: "",
    gender: [],
    caste: [],
  })

  const { data: users, isLoading, isFetching, hasNextPage, isFetchingNextPage, fetchNextPage, refetch } = useUsersList({ ...props, ...final })

  const currentTab: any = props.approvalStatus || (props.isBlocked ? "blocked" : "deleted")

  const table = useReactTable({
    data: users as any || [],
    columns: columns(currentTab, role),
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
    <>
      <UsersFiltersRow
        methods={methods}
        needReset={!!final && Object.keys(final)?.length > 0}
        isLoading={isLoading || isFetching}
        onSubmit={onSubmit}
        onReset={onReset}
        onRefresh={refetch}
      >
        <ColumnToggle table={table} />
      </UsersFiltersRow>

      {
        isLoading ?
          <div className={cn("dc", loaderHt)}>
            <Loader className="animate-spin" />
          </div>
          :
          <DataTableVirtualized
            table={table}
            className={cn('mt-4 sm:pr-4 sm:-mr-4 [&_th:nth-child(-n+4)]:min-w-60', loaderHt)}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
            virtualizerOpts={{ paddingEnd: 10, }}
          />
      }
    </>
  )
}

export default Users
