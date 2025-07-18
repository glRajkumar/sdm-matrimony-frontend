import { HeartIcon } from 'lucide-react';
import Link from "next/link";

import { CardDescription, CardTitle } from "@/components/ui/card";

function Layout({ children, role = "user" }: readOnlyChildren & { role?: rolesT }) {
  const base = role === "user" ? "/auth" : `/auth/${role}`

  return (
    <>
      <div className="flex flex-col items-center space-y-2 mb-6">
        <HeartIcon className="h-12 w-12 text-pink-500" />
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Find your perfect match</CardDescription>
      </div>

      {children}

      <div className="mt-4 text-center">
        <Link className="text-sm text-pink-600 hover:underline" href={`${base}/forgot-pass`}>
          Forgot password?
        </Link>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link className="font-medium text-pink-600 hover:underline" href={`${base}/signup`}>
            Sign up
          </Link>
        </p>
      </div>
    </>
  )
}

export default Layout