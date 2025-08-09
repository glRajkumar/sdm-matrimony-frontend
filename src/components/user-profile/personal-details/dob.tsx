"use client";

import { format } from "date-fns";
import { Lock } from "lucide-react";

import useUnlock from "../contact-details/use-unlock";

import { Button } from "@/components/ui/button";

type props = {
  user: userT
}
function Dob({ user }: props) {
  const { isPending, unlockBtnClk } = useUnlock()

  if (!user?.contactDetails) {
    return (
      <Button
        size="sm"
        variant="outline"
        onClick={() => unlockBtnClk(user._id)}
        disabled={isPending}
        className="flex h-7 text-xs mt-1"
      >
        <Lock className="h-4 w-4 text-muted-foreground" />
        {isPending ? "Unlocking..." : "Unlock to View"}
      </Button>
    )
  }

  return (
    <p className="font-medium">
      {user?.dob ? format(new Date(user?.dob), "dd/MM/yyyy") : "---"}
    </p>
  )
}

export default Dob
