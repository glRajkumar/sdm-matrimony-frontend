import Image from 'next/image';
import Link from "next/link";

import { CardDescription, CardTitle } from "@/components/ui/card";

function Layout({ children, role = "user" }: readOnlyChildren & { role?: rolesT }) {
  return (
    <>
      <div className="flex flex-col items-center space-y-2 mb-6">
        <Image
          src="/logo.png"
          width={92}
          height={92}
          alt='SDM-logo'
        />
        <CardTitle>Welcome Back</CardTitle>
        <CardDescription>Find your perfect match</CardDescription>
      </div>

      {children}

      <div className="mt-4 text-center">
        <Link className="text-sm text-pink-600 hover:underline" href={`/auth/${role}/forgot-pass`}>
          Forgot password?
        </Link>
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <Link className="font-medium text-pink-600 hover:underline" href={`/auth/${role}/signup`}>
            Sign up
          </Link>
        </p>
      </div>
    </>
  )
}

export default Layout