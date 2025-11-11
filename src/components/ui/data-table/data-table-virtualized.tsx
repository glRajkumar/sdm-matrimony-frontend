"use client";

import { useEffect, useRef } from "react";
import { type VirtualizerOptions, useVirtualizer } from "@tanstack/react-virtual";
import { flexRender, Table as TanstackTable } from "@tanstack/react-table";
import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData> {
  table: TanstackTable<TData>;
  noTxt?: string;
  overscan?: number
  className?: string;
  hasNextPage?: boolean
  isFetchingNextPage?: boolean
  fetchNextPage?: () => void
  virtualizerOpts?: Partial<Omit<VirtualizerOptions<HTMLDivElement, Element>, 'count' | 'getScrollElement'>>
}

export function DataTableVirtualized<TData>({
  table,
  noTxt = "No matching results.",
  className = "",
  hasNextPage = false,
  isFetchingNextPage = false,
  fetchNextPage = () => { },
  virtualizerOpts,
}: DataTableProps<TData>) {
  const rows = table.getRowModel().rows
  const columnCount = table.getAllColumns().length
  const hasRows = rows.length > 0

  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: hasNextPage ? rows.length + 1 : rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 81,
    overscan: 10,
    ...(virtualizerOpts ?? {}),
  })

  const virtualItems = virtualizer.getVirtualItems()

  useEffect(() => {
    const [lastItem] = [...virtualItems].reverse()

    if (!lastItem) return

    if (lastItem.index >= rows.length - 1 && hasNextPage && !isFetchingNextPage) {
      fetchNextPage?.()
    }
  }, [rows.length, hasNextPage, virtualItems, isFetchingNextPage, fetchNextPage])

  return (
    <div
      ref={parentRef}
      className={cn("overflow-auto", className)}
    >
      <div style={{ height: `${virtualizer.getTotalSize()}px` }}>
        <table className="w-full caption-bottom text-sm">
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
            {hasRows ? (
              virtualItems.map((virtualRow, index) => {
                const isLoaderRow = virtualRow.index > rows.length - 1
                const row = rows[virtualRow.index]

                if (!row) {
                  if (isLoaderRow && hasNextPage) {
                    return (
                      <TableRow
                        key="loader"
                        ref={virtualizer.measureElement}
                        data-index={virtualRow.index}
                        style={{
                          height: `${virtualRow.size}px`,
                          transform: `translateY(${virtualRow.start - index * virtualRow.size}px)`,
                        }}
                      >
                        <TableCell colSpan={columnCount}>
                          <div className="dc">
                            <Loader className="animate-spin" />
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  }
                  return null
                }

                return (
                  <TableRow
                    key={row.id}
                    ref={virtualizer.measureElement}
                    data-state={row?.getIsSelected?.() && "selected"}
                    data-index={virtualRow.index}
                    className="hover:bg-muted/40"
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${virtualRow.start - (isLoaderRow ? index - 1 : index) * virtualRow.size}px)`,
                    }}
                  >
                    {
                      row?.getVisibleCells()?.map((cell) => (
                        <TableCell
                          key={cell.id}
                          className="text-[13px] capitalize"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))
                    }
                  </TableRow>
                )
              })
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={columnCount} className="border-b">
                  <div className="dc h-32 my-4 text-sm text-center">{noTxt}</div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </table>
      </div>
    </div>
  )
}
