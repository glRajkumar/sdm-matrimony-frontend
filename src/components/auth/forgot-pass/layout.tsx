import { HeartIcon } from 'lucide-react';
import Link from "next/link";

import { CardDescription, CardTitle } from "@/components/ui/card";

function Layout({ children, role = "user" }: readOnlyChildren & { role?: rolesT }) {
  return (
    <>
      <div className="flex flex-col items-center space-y-2 mb-6">
        <HeartIcon className="h-12 w-12 text-pink-500" />
        <CardTitle>Forgot Password</CardTitle>
        <CardDescription>Recover your account</CardDescription>
      </div>

      {children}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Remember your password?{" "}
          <Link className="font-medium text-pink-600 hover:underline" href={`/auth/${role}/signin`}>
            Sign in
          </Link>
        </p>
      </div>
    </>
  )
}

export default Layout