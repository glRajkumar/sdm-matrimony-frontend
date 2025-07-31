import { redirect } from 'next/navigation';

import { verifyAccount } from '@/actions';
import { decodeJwt } from '@/server/utils';

type props = {
  searchParams: Promise<{ [key: string]: string }>
}

async function Page({ searchParams }: props) {
  const { token } = await searchParams

  if (!token) return redirect("/")

  const user = await decodeJwt(token)
  const userId = user?._id as string || ""
  if (!userId) return redirect("/")

  await verifyAccount({ token })
  return redirect(`/${user?.role || "user"}`)
}

export default Page
