"use client";

import useUserStore from "@/store/user";

import Users from "@/components/admin/users";

function Page() {
  const _id = useUserStore(s => s._id)

  return (
    <section className="px-2 sm:px-4 py-8">
      <Users
        createdBy={_id}
        approvalStatus="approved"
      />
    </section>
  )
}

export default Page
