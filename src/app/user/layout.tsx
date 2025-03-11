import Navbar from "@/components/navbar";

function Layout({ children }: readOnlyChildren) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  )
}

export default Layout
