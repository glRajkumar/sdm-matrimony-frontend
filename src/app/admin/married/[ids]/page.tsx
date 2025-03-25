import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import { getUserDetails } from '@/actions';
import { tokenEnums } from '@/utils';
import { decodeJwt } from '@/server/utils';

import UserProfile from '@/components/user-profile';

type props = {
  params: Promise<{ ids: string }>
}

async function Page({ params }: props) {
  const { ids } = await params
  if (!ids) return redirect("/admin/married")

  const [userId, marriedTo] = ids.split("_")
  if (!userId || !marriedTo) return redirect("/admin/married")

  const cookieStore = await cookies()
  const token = cookieStore.get(tokenEnums.refreshToken)?.value || ""
  if (!token) return redirect("/admin/married")

  const loggedInUser = await decodeJwt(token)
  const loggedInUserId = loggedInUser?._id as string || ""
  if (!loggedInUserId) return redirect("/admin/married")

  const [user, marriedToUser] = await Promise.all([
    getUserDetails(userId),
    getUserDetails(marriedTo)
  ])

  if (!user || !marriedToUser) return redirect("/admin/married")

  return (
    <>
      <div>
        <UserProfile user={user} canEdit />
      </div>

      <div>
        <UserProfile user={marriedToUser} canEdit />
      </div>
    </>
  )
}

export default Page
