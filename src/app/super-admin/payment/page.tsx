"use client";

import { useState } from "react";
import { Loader } from "lucide-react";
import Script from "next/script";

import { useTestCreateOrder, useTestVerifyPayment } from "@/hooks/use-payment";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Page() {
  const [amount, setAmount] = useState(1)

  const { mutateAsync: createOrderMutate, isPending: isCreateOrderPending } = useTestCreateOrder()
  const { mutate: verifyPaymentMutate, isPending: isVerifyPaymentPending } = useTestVerifyPayment()

  async function onTest() {
    const payload = { amount }

    const data = await createOrderMutate(payload)

    if ((window as any)?.PhonePeCheckout) {
      (window as any)?.PhonePeCheckout?.transact?.({
        tokenUrl: data?.redirectUrl,
        type: "IFRAME",
        callback(res: string) {
          if (res === "CONCLUDED") {
            verifyPaymentMutate({
              orderId: data.orderId,
              merchantOrderId: data.merchantOrderId,
            })
          }
        }
      })
    }
  }

  return (
    <div className="dc h-[90vh]">
      <Card className="min-w-[90%] sm:min-w-sm">
        <CardHeader>
          <CardTitle>Test Payment</CardTitle>
          <CardDescription>Test payment integration with any amount from 1 to 10,000.</CardDescription>
        </CardHeader>

        <CardContent>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              min={1}
              max={10000}
              type="number"
              value={amount}
              onChange={e => setAmount(Number(e.target.value))}
            />
          </div>
        </CardContent>

        <CardFooter className="justify-end">
          <Button
            onClick={onTest}
            disabled={isCreateOrderPending || isVerifyPaymentPending}
          >
            {(isCreateOrderPending || isVerifyPaymentPending) && <Loader className="animate-spin" />}
            Test
          </Button>
        </CardFooter>
      </Card>

      <Script
        src="https://mercury.phonepe.com/web/bundle/checkout.js"
      />
    </div>
  )
}

export default Page
