import { redirect } from 'next/navigation';

import { getUserDetails } from '@/actions';

import UserProfile from '@/components/user-profile';

type props = {
  params: Promise<{ id: string }>
}

async function Page({ params }: props) {
  const { id: userId } = await params
  if (!userId) return redirect("/admin")

  const user = await getUserDetails(userId)

  if (!user) return redirect("/admin")
  return <UserProfile user={user} canEdit />
}

export default Page
