import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { createOrder, verifyPayment } from "@/actions";
import useUserStore from "@/store/user";

export function useCreateOrder() {
  return useMutation({
    mutationFn: createOrder,
    onError: (error) => {
      toast.error(error?.message || "Failed to create order")
    },
  })
}

export function useVerifyPayment() {
  const updateCurrentPlan = useUserStore(s => s.updateCurrentPlan)
  const navigate = useRouter()

  return useMutation({
    mutationFn: verifyPayment,
    onSuccess: (res) => {
      toast.success("Payment verified successfully")
      updateCurrentPlan(res)
      navigate.push("/user")
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to verify payment")
    },
  })
}
