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
          className="md:hidden fixed top-20 left-4 z-1"
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
          contentHt="h-[calc(100vh-6rem)]"
          hasFilters={hasFilters}
          onSave={onSave}
        />
      </SheetContent>
    </Sheet>
  )
}

export default MobileSheet