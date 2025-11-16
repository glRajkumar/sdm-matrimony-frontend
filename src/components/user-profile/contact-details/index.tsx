"use client";

import { Info } from "lucide-react";

import useUnlock from "./use-unlock";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolTipWrapper } from "@/components/ui/tooltip";
import UpgradeBtn from "./upgrade-btn";
import Edit from "./edit";

type props = {
  user: userT & { hasFullAccess?: boolean }
  canEdit: boolean
}

function ContactDetails({ user, canEdit }: props) {
  const { isPending, unlockBtnClk } = useUnlock()
  const isUnlocked = !!user?.hasFullAccess

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Contact Details</CardTitle>
          <CardDescription>Information about your contact details</CardDescription>
        </div>

        {
          canEdit &&
          <Edit user={user} />
        }
      </CardHeader>

      <CardContent>
        <div className="grid min-[400px]:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-muted-foreground">Phone Number</span>
            {
              user?.contactDetails?.mobile === "restricted"
                ?
                <p className="df">
                  9791155234
                  <ToolTipWrapper description="This is restricted account, Contact admin by the given number">
                    <Info className="size-4" />
                  </ToolTipWrapper>
                </p>
                :
                <UpgradeBtn
                  value={user?.contactDetails?.mobile}
                  unlocked={isUnlocked}
                  isPending={isPending}
                  unlockBtnClk={() => unlockBtnClk(user._id)}
                />
            }
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Address</span>
            <UpgradeBtn
              value={user?.contactDetails?.address}
              unlocked={isUnlocked}
              isPending={isPending}
              unlockBtnClk={() => unlockBtnClk(user._id)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ContactDetails
