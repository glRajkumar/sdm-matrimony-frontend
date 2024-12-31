import SigninLayout from '../../signin/layout';

function Layout({ children }: readOnlyChildren) {
  return (
    <SigninLayout role="broker">
      {children}
    </SigninLayout>
  )
}

export default Layout
