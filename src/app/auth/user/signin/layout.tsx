import SigninLayout from '@/components/auth/signin/layout';

function Layout({ children }: readOnlyChildren) {
  return (
    <SigninLayout>
      {children}
    </SigninLayout>
  )
}

export default Layout
