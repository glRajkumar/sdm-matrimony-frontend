import SigninLayout from '../../signin/layout';

function Layout({ children }: readOnlyChildren) {
  return (
    <SigninLayout role="admin">
      {children}
    </SigninLayout>
  )
}

export default Layout
