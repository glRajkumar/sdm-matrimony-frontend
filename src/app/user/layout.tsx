import Navbar from "@/components/navbar";
import Modals from "./modals";

function Layout({ children }: readOnlyChildren) {
  return (
    <main>
      <Navbar />
      {children}

      <Modals />
    </main>
  )
}

export default Layout
