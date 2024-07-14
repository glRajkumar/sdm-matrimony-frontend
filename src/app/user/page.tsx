import UsersList from "@/components/users-list";

function Page() {
  return (
    <section className="h-[calc(100vh-3rem)] px-2 sm:px-4 py-8 overflow-y-auto">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1 sm:gap-2">
        <UsersList />
      </div>
    </section>
  )
}

export default Page
