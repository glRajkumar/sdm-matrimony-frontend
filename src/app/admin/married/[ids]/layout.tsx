import MarriedPairLayout from "@/components/admin/married-pair/layout";

function Layout({ children }: readOnlyChildren) {
  return (
    <MarriedPairLayout role="admin">
      {children}
    </MarriedPairLayout>
  )
}

export default Layout
