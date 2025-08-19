import VerifyCheck from "@/components/verify-check";
import Navbar from "@/components/navbar";

function Layout({ children }: readOnlyChildren) {
  return (
    <main>
      <Navbar role="user" />
      {children}

      <VerifyCheck />
    </main>
  )
}

export default Layout
