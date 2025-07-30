"use client";

import { useCreateOrder, useVerifyPayment } from "@/hooks/use-payment";

function Page() {
  const { mutateAsync: createOrderMutate, isPending: isCreateOrderPending } = useCreateOrder()
  const { mutate: verifyPaymentMutate, isPending: isVerifyPaymentPending } = useVerifyPayment()

  const amount = 5000

  const handlePayment = async () => {
    const data = await createOrderMutate(amount)
    console.log(data)

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: data.amount,
      currency: data.currency,
      name: 'Sri Durgadevi Matrimony',
      description: 'Unlock user informations',
      order_id: data.id,
      handler: verifyPaymentMutate,
    }

    const rzp = new (window as any).Razorpay(options)
    rzp.open()
  }

  return (
    <div>
      <button onClick={handlePayment}>Pay ₹{amount}</button>
    </div>
  )
}

export default Page
