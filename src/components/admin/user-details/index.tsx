import { redirect } from 'next/navigation';

import { getUserDetails } from '@/actions';

import UserProfile from '@/components/user-profile';

type props = {
  id: string
  role: rolesT
}

async function UserDetails({ id, role }: props) {
  if (!id) return redirect(`/${role}`)

  const user = await getUserDetails(id)

  if (!user) return redirect(`/${role}`)
  return <UserProfile user={user} canEdit />
}

export default UserDetails
