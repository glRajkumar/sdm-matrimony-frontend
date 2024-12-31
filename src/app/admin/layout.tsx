import Navbar from "@/components/navbar";

function Layout({ children }: readOnlyChildren) {
  return (
    <main className="h-screen overflow-hidden">
      <Navbar />
      {children}
    </main>
  )
}

export default Layout
