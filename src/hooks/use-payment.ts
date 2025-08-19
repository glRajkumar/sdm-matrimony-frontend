import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
  const queryClient = useQueryClient()
  const navigate = useRouter()

  return useMutation({
    mutationFn: verifyPayment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-details-mini"] })
      toast.success("Payment verified successfully")
      navigate.push("/user")
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to verify payment")
    },
  })
}
