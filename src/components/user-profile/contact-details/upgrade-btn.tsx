"use client";

import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";

type props = {
  user: userT
  type: "mobile" | "address"
  isPending: boolean
  unlockBtnClk: () => void
}

function UpgradeBtn({ user, type, isPending, unlockBtnClk }: props) {
  if (user?.contactDetails) {
    return (
      <p className="font-medium">{user?.contactDetails?.[type] || "---"}</p>
    )
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={unlockBtnClk}
      disabled={isPending}
      className="flex h-7 text-xs mt-1"
    >
      <Lock className="h-4 w-4 text-muted-foreground" />
      {isPending ? "Unlocking..." : "Unlock to View"}
    </Button>
  )
}

export default UpgradeBtn
