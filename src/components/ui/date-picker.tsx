"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar, type calendarProps } from "@/components/ui/calendar"
import { Button, type buttonProps } from "@/components/ui/button"

type props = {
  value: Date | undefined
  onChange: (date: Date | undefined) => void
  className?: string
  btnProps?: Omit<buttonProps, "className">
  calendarProps?: Omit<calendarProps, "selected" | "onSelect" | "mode">
}

export function DatePicker({ value, onChange, className, btnProps, calendarProps }: props) {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-48 justify-between font-normal", className)}
          {...btnProps}
        >
          {value ? value?.toLocaleDateString() : "Select date"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          {...calendarProps}
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange(date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
