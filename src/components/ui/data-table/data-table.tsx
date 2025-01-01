"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table, TableBody, TableCell,
  TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { FilterGroup } from "./filter-group";
import { Input } from "../input";

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  noTxt?: string
  filters?: {
    key: string
    lable: string
  }[]
}

type optionsT = {
  key: string
  lable: string
  options: string[]
}[]

export function DataTable<TData, TValue>({
  data,
  columns,
  filters = [],
  noTxt = "",
}: TableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])

  const [rowSelection, setRowSelection] = useState({})
  const [globalFilter, setGlobalFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const filterOptions: optionsT = useMemo(() => {
    if (!filters || filters?.length === 0) return []

    const payload = filters.reduce((prev: any, curr: any) => {
      prev[curr.key] = new Set()
      return prev
    }, {})

    const keys = Object.keys(payload)
    data.forEach((curr: any) => {
      keys.forEach(key => {
        payload[key].add(curr[key])
      })
    })

    return filters.map(f => ({ ...f, options: [...payload[f.key]] }))
  }, [filters, data])

  return (
    <>
      <div className="df gap-3 flex-wrap mb-8">
        <div className="relative">
          <Search className="size-4 text-muted-foreground absolute top-3 left-2.5" />
          <Input
            type="text"
            className="pl-8"
            placeholder="Search"
            value={globalFilter}
            onChange={e => setGlobalFilter(e.target.value)}
          />
        </div>

        {
          filters?.length > 0 &&
          <FilterGroup
            table={table}
            options={filterOptions}
          />
        }
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="hover:bg-transparent">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="text-theme-grey-text">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="text-[13px] capitalize">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={columns.length} className="border-b">
                <div className="dc h-32 my-4 text-sm text-center">
                  {noTxt || "No matching results."}
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  )
}
