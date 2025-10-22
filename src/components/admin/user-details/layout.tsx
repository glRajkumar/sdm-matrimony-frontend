import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

function Layout({ children, role = "admin" }: readOnlyChildren & { role?: rolesT }) {
  return (
    <section className="container mx-auto py-6 max-w-6xl @container">
      <Button asChild variant="outline" className="mb-6 mt-2">
        <Link href={`/${role}`}><ChevronLeft className="size-4" /> Go Back</Link>
      </Button>

      <div className="grid @2xl:grid-cols-3 gap-6">
        {children}
      </div>
    </section>
  )
}

export default Layout
