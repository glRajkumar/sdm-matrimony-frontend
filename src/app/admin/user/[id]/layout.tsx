import UserDetailsLayout from "@/components/admin/user-details/layout";

function Layout({ children }: readOnlyChildren) {
  return (
    <UserDetailsLayout role="admin">
      {children}
    </UserDetailsLayout>
  )
}

export default Layout
