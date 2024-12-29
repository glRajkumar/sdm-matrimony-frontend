import { headers } from "next/headers";

import { cn } from "@/lib/utils";

import { CardContent, Card } from "@/components/ui/card";

async function Layout({ children }: readOnlyChildren) {
  const headList = await headers()
  const route = headList?.get("referer")?.split("/")?.pop()

  return (
    <div className="dc p-8 min-h-screen bg-gradient-to-r from-pink-100 to-purple-100">
      <Card
        className={cn("w-full", {
          "max-w-2xl": route === "signup",
          "max-w-md": route !== "signup",
        })}
      >
        <CardContent className="p-8">
          {children}
        </CardContent>
      </Card>
    </div>
  )
}

export default Layout
