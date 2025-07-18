import SigninLayout from '@/components/auth/signin/layout';

function Layout({ children }: readOnlyChildren) {
  return (
    <SigninLayout role="admin">
      {children}
    </SigninLayout>
  )
}

export default Layout
