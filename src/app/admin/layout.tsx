import Navbar from "@/components/navbar";

function Layout({ children }: readOnlyChildren) {
  return (
    <main>
      <Navbar isAdmin />
      {children}
    </main>
  )
}

export default Layout
