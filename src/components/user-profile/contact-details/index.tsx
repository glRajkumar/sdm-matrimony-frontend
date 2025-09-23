"use client";

import useUnlock from "./use-unlock";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UpgradeBtn from "./upgrade-btn";
import Edit from "./edit";

type props = {
  user: userT
  canEdit: boolean
}

function ContactDetails({ user, canEdit }: props) {
  const { isPending, unlockBtnClk } = useUnlock()

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
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-muted-foreground">Phone Number</span>
            <UpgradeBtn
              value={user?.contactDetails?.mobile}
              unlocked={!!user?.contactDetails}
              isPending={isPending}
              unlockBtnClk={() => unlockBtnClk(user._id)}
            />
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Address</span>
            <UpgradeBtn
              value={user?.contactDetails?.address}
              unlocked={!!user?.contactDetails}
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
