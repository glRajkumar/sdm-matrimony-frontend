import { HeartIcon } from 'lucide-react';

import { CardDescription, CardTitle } from "@/components/ui/card";

function Layout({ children }: readOnlyChildren) {
  return (
    <>
      <div className="flex flex-col items-center space-y-2 mb-6">
        <HeartIcon className="h-12 w-12 text-pink-500" />
        <CardTitle>Reset Password</CardTitle>
        <CardDescription>Recover your account</CardDescription>
      </div>

      {children}
    </>
  )
}

export default Layout