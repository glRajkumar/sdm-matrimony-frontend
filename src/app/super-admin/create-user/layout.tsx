
function Layout({ children }: readOnlyChildren) {
  return (
    <div className="p-8 pb-6 max-w-2xl mt-8 mx-auto border rounded-2xl shadow">
      <h1 className="mb-2 text-xl font-bold">Create user</h1>
      {children}
    </div>
  )
}

export default Layout
