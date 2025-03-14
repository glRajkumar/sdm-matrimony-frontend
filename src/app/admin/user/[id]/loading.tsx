import { Loader } from "lucide-react";

function Loading() {
  return (
    <div className="dc w-full h-[90vh]">
      <Loader className="animate-spin" />
    </div>
  )
}

export default Loading
