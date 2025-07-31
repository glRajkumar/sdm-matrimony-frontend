import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useUnlockProfile } from "@/hooks/use-user";

import { Button } from "@/components/ui/button";

function UseUnlock() {
  const { mutate, isPending } = useUnlockProfile()
  const router = useRouter()

  function unlockBtnClk(user: userT) {
    if (user?.currentPlan) {
      mutate({ _id: user._id })

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

export default UseUnlock
