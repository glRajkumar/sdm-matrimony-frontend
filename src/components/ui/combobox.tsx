"use client"

import { useState } from "react"
import { Check, ChevronsUpDown, Loader2, Plus } from "lucide-react"

import { useElementWidth } from "@/hooks/use-element"
import { cn } from "@/lib/utils"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Separator } from "./separator"
import { Button } from "@/components/ui/button"
import { Badge } from "./badge"

type base = {
  options: optionsT
  isLoading?: boolean
  placeholder?: string
  emptyMessage?: string
}

type comboboxProps = base & {
  value?: string
  canCreateNew?: boolean
  onValueChange?: (value: string) => void
}

function Combobox({
  value = "",
  options = [],
  isLoading = false,
  placeholder = "",
  emptyMessage = "",
  canCreateNew = false,
  onValueChange = () => { },
}: comboboxProps) {
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
          {
            isLoading
              ? <>
                <Loader2 className="size-4 animate-spin" />
                <span>Loading...</span>
              </>
              :
              <span className="truncate">
                {
                  value
                    ? typeof found === "object" ? found.label : found
                    : placeholder
                }
              </span>
          }
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
                      "h-4 w-4",
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

type btnLableProps = {
  value: primitiveT[]
  options: optionsT
  isLoading?: boolean
  placeholder?: string
}
function ButtonLabel({ isLoading = false, value = [], options = [], placeholder = "" }: btnLableProps) {
  const getLabel = (val: primitiveT) => {
    const found = options.find(o => typeof o === "object" ? o.value === val : o === val)
    return typeof found === "object" ? found.label : found || val
  }

  if (isLoading)
    return (
      <>
        <Loader2 className="size-4 animate-spin" />
        <span>Loading...</span>
      </>
    )

  if (value.length === 0) {
    if (!placeholder) return null
    return <span className="text-muted-foreground">{placeholder}</span>
  }

  if (value.length <= 2) {
    return value.map(getLabel).map(v => (
      <Badge
        variant="secondary"
        className="rounded-sm px-1 font-normal"
        key={`${v}`}
      >
        {`${v}`}
      </Badge>
    ))
  }

  return (
    <Badge
      variant="secondary"
      className="rounded-sm px-1 font-normal"
    >
      {value.length} selected
    </Badge>
  )
}

type multiSelectComboboxProps = base & {
  lable?: React.ReactNode
  value?: primitiveT[]
  onValueChange?: (value: primitiveT[]) => void
}

function MultiSelectCombobox({
  lable = "",
  value = [],
  options = [],
  isLoading = false,
  placeholder = "",
  emptyMessage = "",
  onValueChange = () => { },
}: multiSelectComboboxProps) {
  const { ref, width } = useElementWidth<HTMLButtonElement>()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)

  const filteredOptions = options.filter((option) => {
    const label = typeof option === "object" ? option.label : option
    return `${label}`.toLowerCase().includes(query.toLowerCase())
  })

  const handleSelect = (selected: primitiveT) => {
    const newValues = value.includes(selected)
      ? value.filter((v) => v !== selected)
      : [...value, selected]
    onValueChange(newValues)
  }

  const handleClear = () => {
    onValueChange([])
    setQuery("")
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          ref={ref}
          role="combobox"
          variant="outline"
          aria-expanded={open}
          className="w-full justify-between font-normal"
        >
          {
            lable &&
            <>
              <span className="font-medium">{lable}</span>
              {value.length > 0 && <Separator orientation="vertical" className="mx-2 h-4" />}
            </>
          }

          <ButtonLabel
            value={value}
            options={options}
            isLoading={isLoading}
            placeholder={placeholder}
          />

          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0" style={{ width: width ? `${width}px` : "auto" }}>
        <Command shouldFilter={false}>
          <CommandInput
            value={query}
            placeholder="Search..."
            onValueChange={setQuery}
          />

          <CommandList>
            <CommandEmpty>{emptyMessage || "No options found"}</CommandEmpty>

            <CommandGroup>
              {filteredOptions.map((option) => {
                const optValue = typeof option === "object" ? option.value : option
                const label = typeof option === "object" ? option.label : option
                const selected = value.includes(optValue)

                return (
                  <CommandItem
                    key={`${optValue}`}
                    value={`${optValue}`}
                    onSelect={() => handleSelect(optValue)}
                  >
                    <Check
                      className={cn(
                        "h-4 w-4",
                        selected ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {`${label}`}
                  </CommandItem>
                )
              })}

              {value.length > 0 && (
                <>
                  <CommandSeparator />
                  <CommandGroup>
                    <CommandItem
                      className="justify-center text-center"
                      onSelect={handleClear}
                      value="__clear__"
                    >
                      Clear selection(s)
                    </CommandItem>
                  </CommandGroup>
                </>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export {
  Combobox,
  MultiSelectCombobox,
}