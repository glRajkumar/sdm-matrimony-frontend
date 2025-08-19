"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useUserDetailsMini } from "@/hooks/use-account";
import { useUnlockProfile } from "@/hooks/use-user";

import { Button } from "@/components/ui/button";

function useUnlock() {
  const { data: user } = useUserDetailsMini()

  const { mutate, isPending } = useUnlockProfile()
  const router = useRouter()
  console.log(user?.currentPlan)
  function unlockBtnClk(_id: string) {
    const currentPlan = user?.currentPlan
    if (currentPlan && new Date(currentPlan?.expiryDate).getTime() > new Date().getTime()) {
      mutate({ _id })

    } else {
      toast("Unlock Contact Details", {
        position: "top-center",
        description: "Payment required to view contact information. Proceed to payment?",
        action: (
          <Button
            size="sm"
            onClick={() => {
              toast.dismiss()
              router.push("/user/payment")
            }}
            className="ml-2"
          >
            Pay Now
          </Button>
        ),
        duration: 6000,
      })
    }
  }

  return {
    isPending,
    unlockBtnClk,
  }
}

export default useUnlock
