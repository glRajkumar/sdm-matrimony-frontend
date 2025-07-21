import { CardDescription, CardTitle } from "@/components/ui/card"
import { HeartIcon } from "lucide-react"

function Layout({ children }: readOnlyChildren) {
  return (
    <>
      <div className="flex flex-col items-center space-y-2 mb-6">
        <div className="dc p-3 rounded-full bg-gradient-to-r from-rose-400 to-pink-500">
          <HeartIcon className="h-7 w-7 text-white" />
        </div>
        <CardTitle>Admin Login</CardTitle>
        <CardDescription>Find your perfect match</CardDescription>
      </div>

      {children}
    </>
  )
}

export default Layout
