import Navbar from "@/components/navbar";

function Layout({ children }: readOnlyChildren) {
  return (
    <main>
      <Navbar role="user" />
      {children}
    </main>
  )
}

export default Layout
