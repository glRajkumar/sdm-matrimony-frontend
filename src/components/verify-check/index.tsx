"use client";

import { useState } from "react";

import useUserStore from "@/store/user";
import useUIStore from "@/store/ui";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import VerifyReminder from "./verify-reminder";
import AddEmail from "./add-email";

function Inner() {
  const isVerified = useUserStore(s => s.isVerified)
  const email = useUserStore(s => s.email)

  const [open, setOpen] = useState(!email || !isVerified)

  const onSuccess = () => setOpen(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        {
          !email &&
          <AddEmail
            onSuccess={onSuccess}
          />
        }

        {
          !!email && !isVerified &&
          <VerifyReminder
            email={email}
            onSuccess={onSuccess}
          />
        }
      </DialogContent>
    </Dialog>
  )
}
function VerifyCheck() {
  const remindVerification = useUIStore(s => s.remindVerification)

  if (!remindVerification) return null
  return <Inner />
}

export default VerifyCheck
