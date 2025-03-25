import FindUser from "./find-user";

function Page() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Make Match</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FindUser gender="Male" />
        <FindUser gender="Female" />
      </div>
    </div>
  )
}

export default Page