import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { getUserDetails } from '@/actions';
import { tokenEnums } from '@/utils';
import { decodeJwt } from '@/server/utils';

import UserProfile from '@/components/user-profile';

type props = {
  params: Promise<{ id: string }>
}

async function Page({ params }: props) {
  const { id: userId } = await params
  if (!userId) return redirect("/admin")

  const cookieStore = await cookies()
  const token = cookieStore.get(tokenEnums.refreshToken)?.value || ""
  if (!token) return redirect("/admin")

  const loggedInUser = await decodeJwt(token)
  const loggedInUserId = loggedInUser?._id as string || ""
  if (!loggedInUserId) return redirect("/admin")

  const user = await getUserDetails(userId)

  if (!user) return redirect("/admin")

  return <UserProfile user={user} canEdit />
}

export default Page
