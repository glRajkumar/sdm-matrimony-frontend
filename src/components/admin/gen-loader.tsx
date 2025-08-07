import { Loader } from "lucide-react";

import { cn } from "@/lib/utils";

type props = {
  className?: string
}

function GenLoader({ className }: props) {
  return (
    <div className={cn("dc w-full h-[90vh]", className)}>
      <Loader className="animate-spin" />
    </div>
  )
}

export default GenLoader
