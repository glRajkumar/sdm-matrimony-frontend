import { CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";

function Layout({ children }: readOnlyChildren) {
  return (
    <>
      <div className="flex flex-col items-center space-y-2 mb-6">
        <Image
          src="/logo.png"
          width={80}
          height={80}
          alt='SDM-logo'
        />
        <CardTitle>Admin Login</CardTitle>
        <CardDescription>Find your perfect match</CardDescription>
      </div>

      {children}
    </>
  )
}

export default Layout
