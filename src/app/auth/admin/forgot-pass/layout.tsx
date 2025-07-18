import ForgotPassLayout from '@/components/auth/forgot-pass/layout';

function Layout({ children }: readOnlyChildren) {
  return (
    <ForgotPassLayout role="admin">
      {children}
    </ForgotPassLayout>
  )
}

export default Layout
