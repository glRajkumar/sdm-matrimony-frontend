import { useState } from "react";
import { LuCalendar as CalendarIcon } from "react-icons/lu";
import { format } from "date-fns";

import { cn } from "@/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

export function DatePicker({ onDateSelect }: any) {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "dd-MM-yyyy hh:mm a") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => {
            if (newDate) {
              const now = new Date();
              newDate.setHours(now.getHours());
              newDate.setMinutes(now.getMinutes());
              setDate(newDate);
              onDateSelect(format(newDate, "dd-MM-yyyy hh:mm a"));
            }
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}