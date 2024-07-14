import Profile from "@/components/profile";

function Page({ params }: { params: { id: string } }) {
  return <Profile userId={params?.id} />
}

export default Page
