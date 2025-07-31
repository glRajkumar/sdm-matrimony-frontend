"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Lock } from "lucide-react";

import { useUnlockProfile } from "@/hooks/use-user";

import { Button } from "@/components/ui/button";

type props = {
  user: userT
  type: "mobile" | "address"
}

function UpgradeBtn({ user, type }: props) {
  const { mutate, isPending } = useUnlockProfile()
  const router = useRouter()

  const handleUnlockClick = async () => {
    if (user?.currentPlan) {
      mutate({ _id: user._id })

    } else {
      toast("Unlock Contact Details", {
        description: "Payment required to view contact information. Proceed to payment?",
        action: (
          <Button
            size="sm"
            onClick={() => router.push("/payment")}
            className="ml-2"
          >
            Pay Now
          </Button>
        ),
        duration: 6000,
      })
    }
  }

  if (user?.contactDetails) {
    return (
      <p className="font-medium">{user?.contactDetails?.[type] || "---"}</p>
    )
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleUnlockClick}
      disabled={isPending}
      className="flex h-7 text-xs mt-1"
    >
      <Lock className="h-4 w-4 text-muted-foreground" />
      {isPending ? "Unlocking..." : "Unlock to View"}
    </Button>
  )
}

export default UpgradeBtn
