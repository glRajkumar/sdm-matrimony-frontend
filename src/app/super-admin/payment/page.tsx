"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import MakePaymentForUser from "./make-payment-for-user";
import TestPayment from "./test-payment";

function Page() {
  const [isTest, setIsTest] = useState(false)

  return (
    <div className="p-6">
      <Button
        size="sm"
        variant="secondary"
        onClick={() => setIsTest(p => !p)}
        className="block mb-4 ml-auto"
      >
        {isTest ? "Pay for user" : "Test Payment"}
      </Button>

      {
        isTest
          ? <TestPayment />
          : <MakePaymentForUser />
      }
    </div>
  )
}

export default Page
