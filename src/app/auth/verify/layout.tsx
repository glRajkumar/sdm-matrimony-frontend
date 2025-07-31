import { Loader } from "lucide-react";

function Layout({ children }: readOnlyChildren) {
  return (
    <div>
      <h1>Account verification in progress...</h1>
      <Loader className="animate-spin" />
      {children}
    </div>
  )
}

export default Layout
