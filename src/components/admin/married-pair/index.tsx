import { redirect } from 'next/navigation';

import { getUserDetails } from '@/actions';

import UserProfile from '@/components/user-profile';

type props = {
  ids: string
  role: rolesT
}

async function MarriedPair({ ids, role }: props) {
  if (!ids) return redirect(`/${role}/married`)

  const [userId, marriedTo] = ids.split("_")
  if (!userId || !marriedTo) return redirect(`/${role}/married`)

  const [user, marriedToUser] = await Promise.all([
    getUserDetails(userId),
    getUserDetails(marriedTo)
  ])

  if (!user || !marriedToUser) return redirect(`/${role}/married`)

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

export default MarriedPair
