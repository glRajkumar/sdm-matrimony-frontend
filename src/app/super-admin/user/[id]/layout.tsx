import UserDetailsLayout from "@/components/admin/user-details/layout";

function Layout({ children }: readOnlyChildren) {
  return (
    <UserDetailsLayout role="super-admin">
      {children}
    </UserDetailsLayout>
  )
}

export default Layout
