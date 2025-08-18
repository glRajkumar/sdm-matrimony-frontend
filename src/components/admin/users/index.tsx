"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { userListProps, useUsersList } from '@/hooks/use-admin';
import { gender, maritalStatus } from '@/utils/enums';
import { useStatics } from "@/hooks/use-general";

import { ColumnToggle, DataTable, ColumnFacetedFilter } from "@/components/ui/data-table";
import { columns } from "./columns";

import { Input } from '@/components/ui/input';
import LoadMore from "@/components/common/load-more";

function Users({ role = "admin", loaderHt = "h-[calc(100vh-3rem)]", ...props }: userListProps & { role?: rolesT, loaderHt?: string }) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const [globalFilter, setGlobalFilter] = useState('')

  const { data: users, isLoading, isFetching, hasNextPage, fetchNextPage, } = useUsersList(props)
  const { data: castes, isLoading: isCasteLoading } = useStatics("castes")

  const currentTab: any = props.approvalStatus || (props.isBlocked ? "blocked" : "deleted")

  const table = useReactTable({
    data: users as any || [],
    columns: columns(currentTab, role),
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  if (isLoading || isCasteLoading) return (
    <div className={`dc ${loaderHt}`}>
      <Loader className="animate-spin" />
    </div>
  )

  return (
    <>
      <div className='df'>
        <Input
          className='w-60'
          value={table.getState().globalFilter}
          onChange={e => table.setGlobalFilter(e.target.value)}
        />

        <ColumnFacetedFilter
          column={table.getColumn("gender")}
          title="Gender"
          options={gender.map(gen => ({ label: gen, value: gen }))}
        />

        <ColumnFacetedFilter
          column={table.getColumn("maritalStatus")}
          title="Marital Status"
          options={maritalStatus.map(status => ({ label: status, value: status }))}
        />

        <ColumnFacetedFilter
          column={table.getColumn("Caste")}
          title="Caste"
          options={castes?.map((status: string) => ({ label: status, value: status }))}
        />

        <ColumnToggle table={table} />
      </div>

      <DataTable
        table={table}
        className='my-4 [&_th:nth-child(-n+4)]:min-w-60'
      />

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
    </>
  )
}

export default Users
