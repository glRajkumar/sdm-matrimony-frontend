"use client";

import { Lock } from "lucide-react";

import UseUnlock from "../contact-details/use-unlock";

import { Button } from "@/components/ui/button";

type props = {
  user: userT
}

function VerdicPic({ user }: props) {
  const { isPending, unlockBtnClk } = UseUnlock()

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

  if (!user?.vedicHoroscope?.vedicHoroscopePic) {
    return <p className="font-medium">---</p>
  }

  return (
    <div className="dc p-4 mt-1 rounded border">
      <img
        src={user?.vedicHoroscope?.vedicHoroscopePic}
        alt="Vedic Horoscope"
        className="max-h-96"
      />
    </div>
  )
}

export default VerdicPic
