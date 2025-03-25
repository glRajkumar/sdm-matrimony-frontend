import { Loader } from "lucide-react";

function Loading() {
  return (
    <div className="dc w-full h-[90vh] md:col-span-2">
      <Loader className="animate-spin" />
    </div>
  )
}

export default Loading
