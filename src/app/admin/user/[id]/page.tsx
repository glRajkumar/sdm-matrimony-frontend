import UserDetails from '@/components/admin/user-details';

type props = {
  params: Promise<{ id: string }>
}

async function Page({ params }: props) {
  const { id } = await params

  return <UserDetails id={id} role="admin" />
}

export default Page
