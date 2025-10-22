import UserDetailsLayout from "@/components/admin/user-details/layout";

function Layout({ children }: readOnlyChildren) {
  return (
    <UserDetailsLayout role="user">
      {children}
    </UserDetailsLayout>
  )
}

export default Layout
