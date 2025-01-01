import { TiArrowUnsorted, TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface ColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function ColumnSorter<TData, TValue>({
  column,
  title,
  className,
}: ColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) return <div className={cn(className)}>{title}</div>

  const sorted = column.getIsSorted()

  return (
    <Button
      size="sm"
      variant="ghost"
      className={cn("-ml-3 h-7 text-xs data-[state=open]:bg-transparent", className)}
      onClick={() => column.toggleSorting(sorted === "asc")}
    >
      <span>{title}</span>
      {sorted === "desc" ? (
        <TiArrowSortedDown className="ml-4 opacity-80" />
      ) : sorted === "asc" ? (
        <TiArrowSortedUp className="ml-4 opacity-80" />
      ) : (
        <TiArrowUnsorted className="ml-4 opacity-80" />
      )}
    </Button>
  )
}
