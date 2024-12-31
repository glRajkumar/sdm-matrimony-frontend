import Link from "next/link";
import { HeartIcon } from 'lucide-react';

import { CardDescription, CardTitle } from "@/components/ui/card";

function Layout({ children }: readOnlyChildren) {
  return (
    <>
      <div className="flex flex-col items-center space-y-2 mb-6">
        <HeartIcon className="h-12 w-12 text-pink-500" />
        <CardTitle>Create Your Account</CardTitle>
        <CardDescription>Find your perfect match</CardDescription>
      </div>

      {children}

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link className="font-medium text-pink-600 hover:underline" href="/auth/signin">
            Sign in
          </Link>
        </p>
      </div>
    </>
  )
}

export default Layout