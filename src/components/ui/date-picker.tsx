"use client"

import * as React from "react"
import { DayPickerDefaultProps, DayPickerSingleProps, DayPickerRangeProps, DayPickerMultipleProps } from "react-day-picker"
import * as PopoverPrimitive from "@radix-ui/react-popover"
import { Calendar as CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

type DatePickerProps = {
  selected?:
  | Date
  | Date[]
  | { from: Date | undefined; to: Date | undefined }
  | undefined
  onChange?: (date: any) => void
  btnProps?: React.ComponentPropsWithoutRef<typeof Button>
  calendarProps?: Partial<
    | DayPickerDefaultProps
    | DayPickerSingleProps
    | DayPickerRangeProps
    | DayPickerMultipleProps
  >
  popoverContentProps?: React.ComponentPropsWithoutRef<typeof PopoverPrimitive.Content>
}

export function DatePicker({ selected, onChange, btnProps, calendarProps, popoverContentProps, }: DatePickerProps) {
  const formatSelected = () => {
    if (!selected) return <span>Pick a date</span>

    if (selected instanceof Date) {
      return format(selected, "PPP")
    }

    if (Array.isArray(selected)) {
      return selected.length > 0
        ? `${selected.length} date${selected.length > 1 ? 's' : ''} selected`
        : <span>Pick dates</span>
    }

    if (typeof selected === 'object' && ('from' in selected || 'to' in selected)) {
      if (selected.from && selected.to) {
        return `${format(selected.from, "PPP")} - ${format(selected.to, "PPP")}`
      }
      if (selected.from) {
        return `${format(selected.from, "PPP")} - `
      }
      if (selected.to) {
        return ` - ${format(selected.to, "PPP")}`
      }
    }

    return <span>Pick a date</span>
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          {...btnProps}
          className={cn("w-full justify-start text-left font-normal", btnProps?.className)}
        >
          <CalendarIcon className="h-4 w-4" />
          {formatSelected()}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        {...popoverContentProps}
        className={cn("p-0", popoverContentProps?.className)}
      >
        <Calendar
          {...calendarProps}
          selected={selected}
          // @ts-ignore
          onSelect={onChange}
          className={cn(calendarProps?.className)}
        />
      </PopoverContent>
    </Popover>
  )
}