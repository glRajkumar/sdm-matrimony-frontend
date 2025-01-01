import { useState } from "react";
import { ChevronDown, Check } from "lucide-react";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface ColumndFilterProps<TData, TValue> {
  column?: Column<TData, TValue>
  title?: string
  options: string[]
  remove: () => void
  popoverContentCls?: string
}

export function ColumnFilter<TData, TValue>({
  column,
  title,
  options,
  remove,
  popoverContentCls = "",
}: ColumndFilterProps<TData, TValue>) {
  const [open, setOpen] = useState(false)

  const selectedValues = new Set(column?.getFilterValue() as string[])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {title}
          <ChevronDown
            className={cn("size-4 transition-transform", {
              "rotate-180": open
            })}
          />
        </Button>
      </PopoverTrigger>

      <PopoverContent className={cn("w-fit p-0", popoverContentCls)} align="start">
        <Command>
          <CommandInput
            placeholder="Filter"
            className="text-xs"
          />

          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>

            <CommandGroup className="p-0 pt-1">
              <CommandItem
                className="px-4 py-2 text-xs font-medium text-primary aria-selected:bg-theme-grey-text/5 cursor-pointer rounded-none"
                onSelect={() => column?.setFilterValue(selectedValues.size > 0 ? undefined : options)}
              >
                Select {selectedValues.size > 0 ? "None" : "All"}
              </CommandItem>
            </CommandGroup>

            <CommandGroup className="p-0">
              {options.map((option) => {
                const isSelected = selectedValues.has(option)
                return (
                  <CommandItem
                    key={option}
                    onSelect={() => {
                      const updatedValues = new Set(selectedValues);
                      if (isSelected) {
                        updatedValues.delete(option);
                      } else {
                        updatedValues.add(option);
                      }
                      const filterValues = Array.from(updatedValues);
                      column?.setFilterValue(
                        filterValues?.length ? filterValues : []
                      );
                    }}
                    className="flex items-center w-full px-4 py-1.5 text-xs aria-selected:bg-transparent aria-selected:text-primary cursor-pointer"
                  >
                    <span className="w-11/12 font-medium text-theme-text truncate">{option}</span>

                    <div
                      className={cn(
                        "flex h-5 w-5 ml-auto items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="size-3" />
                    </div>
                  </CommandItem>
                )
              })}
            </CommandGroup>

            <CommandSeparator />

            <CommandItem onSelect={remove} className="justify-center py-2">
              Remove Filter
            </CommandItem>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}