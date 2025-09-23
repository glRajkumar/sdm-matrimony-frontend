"use client";

import { Lock } from "lucide-react";

import { Button } from "@/components/ui/button";

type props = {
  isPending: boolean
  unlockBtnClk: () => void
  unlocked: boolean
  value: string
}

function UpgradeBtn({ unlocked, value, isPending, unlockBtnClk }: props) {
  if (unlocked) {
    return (
      <p className="font-medium">{value || "---"}</p>
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
