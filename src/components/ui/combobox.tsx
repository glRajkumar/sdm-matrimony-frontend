"use client"

import { useState } from "react"
import { Check, ChevronsUpDown } from "lucide-react"

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
  onValueChange?: (value: string) => void
}

function Combobox({
  value = "",
  options,
  placeholder = "",
  emptyMessage = "",
  onValueChange = () => { },
}: Props) {
  const { ref, width } = useElementWidth<HTMLButtonElement>()

  const [open, setOpen] = useState(false)

  const found = value ?
    options?.find((option) => typeof option === "object" ? option.value === value : option === value)
    : ""

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
            value
              ? typeof found === "object" ? found.label : found
              : placeholder
          }
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-0" style={{ width: width ? `${width}px` : "auto" }}>
        <Command>
          <CommandInput placeholder={placeholder} />

          <CommandList>
            <CommandEmpty>{emptyMessage || "No options found"}</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
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