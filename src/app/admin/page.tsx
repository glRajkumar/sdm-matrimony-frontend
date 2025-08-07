import Users from "@/components/admin/users";

function Page() {
  return (
    <section className="px-2 sm:px-4 py-8">
      <Users approvalStatus="approved" />
    </section>
  )
}

export default Page
