import Link from "next/link";

import { CardDescription, CardTitle } from "@/components/ui/card";

function Layout({ children }: readOnlyChildren) {
  return (
    <>
      <div className="dc gap-0 flex-col -mt-8 mb-4">
        <img
          src="/logos/logo-512.webp"
          width={60}
          height={60}
          alt='SDM-logo'
        />
        <CardTitle>Create Your Account</CardTitle>
        <CardDescription>Find your perfect match</CardDescription>
      </div>

      {children}

      <div className="mt-4 -mb-8 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link className="font-medium text-pink-600 hover:underline" href="/auth/user/signin">
            Sign in
          </Link>
        </p>
      </div>
    </>
  )
}

export default Layout