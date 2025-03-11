
function Layout({ children }: readOnlyChildren) {
  return (
    <section className="container mx-auto py-6 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-6">
        {children}
      </div>
    </section>
  )
}

export default Layout
