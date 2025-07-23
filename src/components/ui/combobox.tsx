"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Plus } from "lucide-react"

import { useElementWidth } from "@/hooks/use-element"
import { cn } from "@/lib/utils"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

type Props = {
  value?: string
  options: optionsT
  placeholder?: string
  emptyMessage?: string
  canCreateNew?: boolean
  onValueChange?: (value: string) => void
}

function Combobox({
  value = "",
  options,
  placeholder = "",
  emptyMessage = "",
  canCreateNew = false,
  onValueChange = () => { },
}: Props) {
  const { ref, width } = useElementWidth<HTMLButtonElement>()

  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)

  const found = value ? options?.find((option) => typeof option === "object" ? option.value === value : option === value) || value : ""

  const filteredOptions = options.filter((option) => {
    const searchValue = typeof option === "object" ? `${option.label}` : `${option}`
    return searchValue?.toLowerCase().includes(query.toLowerCase())
  })

  const showCreateOption = canCreateNew && query && query !== value && !options?.find((option) => typeof option === "object" ? option.label === query : option === query)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          role="combobox"
          variant="outline"
          aria-expanded={open}
          className={cn("w-full font-normal justify-between", {
            "text-muted-foreground": !value
          })}
        >
          <span className="truncate">
            {
              value
                ? typeof found === "object" ? found.label : found
                : placeholder
            }
          </span>
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0" style={{ width: width ? `${width}px` : "auto" }}>
        <Command
          shouldFilter={false}
        // filter={(value, search) => {
        //   if (value.startsWith('__create__')) return 1
        //   if (value.includes(search)) return 1
        //   return 0
        // }}
        >
          <CommandInput
            value={query}
            placeholder={placeholder}
            onValueChange={setQuery}
            onKeyDown={(e) => {
              if (e.key === "Enter" && canCreateNew) {
                onValueChange(query)
                setQuery('')
                setOpen(false)
              }
              if (e.shiftKey && (e.key === "Home" || e.key === "End")) {
                e.stopPropagation()
                return
              }
            }}
          />

          <CommandList>
            <CommandEmpty>
              {!canCreateNew && (emptyMessage || "No options found")}
            </CommandEmpty>

            <CommandGroup>
              {filteredOptions.map((option) => (
                <CommandItem
                  key={typeof option === "object" ? `${option.value}` : `${option}`}
                  value={typeof option === "object" ? `${option.value}` : `${option}`}
                  onSelect={(currentValue) => {
                    onValueChange(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === (typeof option === "object" ? `${option.value}` : `${option}`) ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {typeof option === "object" ? option.label : option}
                </CommandItem>
              ))}

              {showCreateOption &&
                <CommandItem
                  value={`__create__${query}`}
                  onSelect={() => {
                    onValueChange(query)
                    setQuery('')
                    setOpen(false)
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  {query}
                </CommandItem>
              }
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export {
  Combobox
}