import Navbar from "@/components/navbar";

type props = Readonly<{
  children: React.ReactNode;
}>

function Layout({ children }: props) {
  return (
    <main className="h-screen overflow-hidden">
      <Navbar />
      {children}
    </main>
  )
}

export default Layout
