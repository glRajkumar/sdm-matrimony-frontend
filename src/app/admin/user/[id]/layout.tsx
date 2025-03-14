import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

function Layout({ children }: readOnlyChildren) {
  return (
    <section className="container mx-auto py-6 max-w-6xl">
      <Button asChild variant="outline" className="mb-6 mt-2">
        <Link href="/admin"><ChevronLeft className="size-4" /> Go Back</Link>
      </Button>

      <div className="flex flex-col md:flex-row gap-6">
        {children}
      </div>
    </section>
  )
}

export default Layout
