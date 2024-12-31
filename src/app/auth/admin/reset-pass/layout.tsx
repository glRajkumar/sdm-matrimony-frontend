import ResetPassLayout from '../../reset-pass/layout';

function Layout({ children }: readOnlyChildren) {
  return (
    <ResetPassLayout>
      {children}
    </ResetPassLayout>
  )
}

export default Layout
