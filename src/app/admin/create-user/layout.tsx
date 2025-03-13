
function Layout({ children }: readOnlyChildren) {
  return (
    <div className="min-h-screen p-16 overflow-y-hidden">
      {children}
    </div>
  )
}

export default Layout
