"use client";

import { Suspense } from "react";
import { Loader } from "lucide-react";

function Layout({ children }: readOnlyChildren) {
  return (
    <Suspense fallback={<Loader className="animate-spin" />}>
      <div className="dc flex-col">
        <h1>Account verification in progress...</h1>
        <Loader className="animate-spin" />
        {children}
      </div>
    </Suspense>
  )
}

export default Layout
