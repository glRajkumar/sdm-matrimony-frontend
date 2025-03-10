"use client";

import { useState } from "react";
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

import { approvalStatus, gender, maritalStatus } from '@/utils/enums';
import { useUsersList } from '@/hooks/use-admin';

import { ColumnToggle, DataTable, ColumnFacetedFilter, useTable } from "@/components/ui/data-table";
import { columns } from "./columns";

import { Input } from '@/components/ui/input';

function PendingUsers() {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const [globalFilter, setGlobalFilter] = useState('')

  const { data: users, isLoading } = useUsersList()

  const table = useReactTable({
    data: users || [],
    columns,
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

  if (isLoading) return (
    <div className='dc h-[calc(100vh-3rem)]'>
      Loading...
    </div>
  )

  return (
    <section className="px-2 sm:px-4 py-8">
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
          column={table.getColumn("approvalStatus")}
          title="Approval Status"
          options={approvalStatus.map(status => ({ label: status, value: status }))}
        />

        <ColumnFacetedFilter
          column={table.getColumn("maritalStatus")}
          title="Marital Status"
          options={maritalStatus.map(status => ({ label: status, value: status }))}
        />

        <ColumnToggle table={table} />
      </div>

      <DataTable
        table={table}
        className='my-4'
      />
    </section>
  )
}

export default PendingUsers
