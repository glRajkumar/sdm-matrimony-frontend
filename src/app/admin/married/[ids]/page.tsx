import MarriedPair from "@/components/admin/married-pair";

type props = {
  params: Promise<{ ids: string }>
}

async function Page({ params }: props) {
  const { ids } = await params

  return <MarriedPair ids={ids} role="admin" />
}

export default Page
