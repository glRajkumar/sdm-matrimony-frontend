import ForgotPassLayout from '@/components/auth/forgot-pass/layout';

function Layout({ children }: readOnlyChildren) {
  return (
    <ForgotPassLayout role="broker">
      {children}
    </ForgotPassLayout>
  )
}

export default Layout
