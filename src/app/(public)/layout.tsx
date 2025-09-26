import Footer from "@/components/home/footer";
import Nav from "@/components/home/nav";

function Layout({ children }: readOnlyChildren) {
  return (
    <>
      <Nav />
      {children}
      <Footer />
    </>
  )
}

export default Layout
