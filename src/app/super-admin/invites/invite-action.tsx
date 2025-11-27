import { Check, Copy } from "lucide-react";

import { type niuT } from "@/hooks/use-super-admin";
import useClipboardCopy from "@/hooks/use-clipboard-copy";
import { createPass } from "@/utils/password";

import { Button } from "@/components/ui/button";

type props = {
  user: niuT
}

function InviteAction({ user }: props) {
  const { copied, onCopyClk } = useClipboardCopy()

  function onCopy() {
    const pass = createPass(user?.fullName, user?.dob)
    onCopyClk(`
Hello ${user?.fullName || "User"},

You've been added to SD Matrimony!
We're excited to have you on board and help you connect with meaningful matches.

Here are your login details:

Id: ${user?.contactDetails?.mobile || ""} (your mobile number)

Password: ${pass}

You can log in using the link below:
👉 Login to SD Matrimony - https://sdmatrimony.com/auth/user/signin

If you did not intend to join SD Matrimony or believe this was a mistake, you can delete your account anytime or contact our support team for assistance.
    `)
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={onCopy}
      className="flex ml-auto"
    >
      {copied ? <Check /> : <Copy />}
      {copied ? "Copied" : "Copy"}
    </Button>
  )
}

export default InviteAction
