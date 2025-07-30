
function Layout({ children }: readOnlyChildren) {
  return (
    <>
      <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

      {children}
    </>
  )
}

export default Layout
