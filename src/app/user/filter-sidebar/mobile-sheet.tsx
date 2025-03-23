import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Filters from "./filters";

interface props {
  hasFilters: boolean
  onSave: (filterData: any) => void
}

function MobileSheet({ hasFilters, onSave }: props) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          className="md:hidden mt-8 ml-4 -mb-2"
        >
          <Menu /> Filters
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="p-4">
        <SheetHeader className="sr-only">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Filter users</SheetDescription>
        </SheetHeader>

        <Filters
          hasFilters={hasFilters}
          onSave={onSave}
        />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSheet