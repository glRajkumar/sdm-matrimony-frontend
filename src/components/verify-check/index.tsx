"use client";

import { useEffect, useState } from "react";

import { useUserDetailsMini } from "@/hooks/use-account";
import useUIStore from "@/store/ui";

import { Dialog, DialogContent } from "@/components/ui/dialog";

import VerifyReminder from "./verify-reminder";
import AddEmail from "./add-email";

function Inner() {
  const { data: user, isLoading } = useUserDetailsMini()

  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (user && (!user?.email || !user?.isVerified)) {
      setOpen(true)
    }
  }, [user])

  const onSuccess = () => setOpen(false)

  function onOpenChange(v: boolean) {
    if (!!user?.email) {
      setOpen(v)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-md"
        showCloseButton={!!user?.email}
      >
        {
          !isLoading && !user?.email &&
          <AddEmail
            onSuccess={onSuccess}
          />
        }

        {
          !isLoading && !!user?.email && !user?.isVerified &&
          <VerifyReminder
            email={user?.email}
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
