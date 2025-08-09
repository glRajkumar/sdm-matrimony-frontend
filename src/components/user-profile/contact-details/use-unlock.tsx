import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useUnlockProfile } from "@/hooks/use-user";
import useUserStore from "@/store/user";

import { Button } from "@/components/ui/button";

function useUnlock() {
  const currentPlan = useUserStore(s => s.currentPlan)

  const { mutate, isPending } = useUnlockProfile()
  const router = useRouter()

  function unlockBtnClk(_id: string) {
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
