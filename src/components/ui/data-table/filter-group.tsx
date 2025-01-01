import { useState } from "react";

import { AiOutlinePlus } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { Table } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ColumnFilter } from "./column-filter";

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
        <DropdownMenuTrigger className="df gap-1 px-2.5 py-[7px] text-xs font-medium border border-dashed border-[#DDDDDD] text-theme-icon hover:border-solid hover:shadow-elevate">
          <AiOutlinePlus className="text-lg leading-3" />
          <span>Filter</span>
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
        <button
          className="p-2 text-sm border border-dashed border-[#DDDDDD] text-theme-icon hover:border-solid hover:shadow-elevate rotate-90"
          onClick={() => table.resetColumnFilters()}
        >
          <MdRefresh />
        </button>
      }
    </>
  )
}
