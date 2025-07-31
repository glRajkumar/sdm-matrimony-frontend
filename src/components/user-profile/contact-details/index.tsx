"use client";

import UseUnlock from "./use-unlock";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import UpgradeBtn from "./upgrade-btn";

type props = {
  user: userT
}

function ContactDetails({ user }: props) {
  const { isPending, unlockBtnClk } = UseUnlock()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact Details</CardTitle>
        <CardDescription>Information about your contact details</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-muted-foreground">Phone Number</span>
            <UpgradeBtn
              user={user}
              type="mobile"
              isPending={isPending}
              unlockBtnClk={() => unlockBtnClk(user)}
            />
          </div>

          <div>
            <span className="text-sm text-muted-foreground">Address</span>
            <UpgradeBtn
              user={user}
              type="address"
              isPending={isPending}
              unlockBtnClk={() => unlockBtnClk(user)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ContactDetails
