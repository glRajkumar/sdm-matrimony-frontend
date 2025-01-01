import { useState } from "react";
import { CirclePlus, RotateCw } from "lucide-react";
import { Table } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnFilter } from "./column-filter";
import { Button } from "../button";

interface FilterGroupProps<TData> {
  table: Table<TData>
  options: {
    key: string
    lable: string
    options: string[]
  }[]
}

export function FilterGroup<TData>({ table, options }: FilterGroupProps<TData>) {
  const [selected, setSelected] = useState<string[]>([])

  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <>
      {
        options
          .filter(f => selected.includes(f.key))
          .map(opt => (
            <ColumnFilter
              key={opt.key}
              column={table.getColumn(opt.key)}
              title={opt.lable}
              options={opt.options}
              remove={() => setSelected(p => p.filter(v => v !== opt.key))}
            />
          ))
      }

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <CirclePlus className="size-4" />
            <span>Filter</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="start" className="px-0">
          {
            options
              .filter(f => !selected.includes(f.key))
              .map(opt => (
                <DropdownMenuItem
                  key={opt.key}
                  onClick={() => setSelected(p => [...p, opt.key])}
                  className="px-4 text-xs font-medium text-theme-text focus:bg-theme-grey-text/5 focus:text-theme-text"
                >
                  {opt.lable}
                </DropdownMenuItem>
              ))
          }
        </DropdownMenuContent>
      </DropdownMenu>

      {
        isFiltered &&
        <Button
          size="icon"
          variant="outline"
          onClick={() => table.resetColumnFilters()}
        >
          <RotateCw className=" size-4" />
        </Button>
      }
    </>
  )
}
