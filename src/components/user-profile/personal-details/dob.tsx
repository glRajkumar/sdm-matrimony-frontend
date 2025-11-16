"use client";

import { format } from "date-fns";
import { Lock } from "lucide-react";

import useUnlock from "../contact-details/use-unlock";

import { Button } from "@/components/ui/button";
import { getAge } from "@/utils";

type props = {
  user: userT & { hasFullAccess?: boolean }
}
function Dob({ user }: props) {
  const { isPending, unlockBtnClk } = useUnlock()
  const isUnlocked = !!user?.hasFullAccess

  return (
    <p className="df flex-wrap font-medium">
      {isUnlocked
        ? user?.dob
          ? format(new Date(user?.dob), "dd/MM/yyyy")
          : "---"
        : <Button
          size="sm"
          variant="outline"
          onClick={() => unlockBtnClk(user._id)}
          disabled={isPending}
          className="flex h-7 text-xs mt-1"
        >
          <Lock className="h-4 w-4 text-muted-foreground" />
          {isPending ? "Unlocking..." : "Unlock to View"}
        </Button>
      }

      <span className="text-xs">( {getAge(user?.dob)} Years )</span>
    </p>
  )
}

export default Dob
