import Navbar from "@/components/navbar";

function Layout({ children }: readOnlyChildren) {
  return (
    <main>
      <Navbar role="admin" />
      {children}
    </main>
  )
}

export default Layout
