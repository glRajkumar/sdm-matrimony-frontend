import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { createOrder, verifyPayment } from "@/actions";

export function useCreateOrder() {
  return useMutation({
    mutationFn: createOrder,
    onError: (error) => {
      toast.error(error?.message || "Failed to create order")
    },
  })
}

export function useVerifyPayment() {
  return useMutation({
    mutationFn: verifyPayment,
    onSuccess: () => {
      toast.success("Payment verified successfully")
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to verify payment")
    },
  })
}
