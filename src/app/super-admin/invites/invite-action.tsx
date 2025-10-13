import { Check, CheckCheck, Copy, Loader } from "lucide-react";
import { format } from "date-fns";

import { type niuT, useUserInvite } from "@/hooks/use-super-admin";
import useClipboardCopy from "@/hooks/use-clipboard-copy";

import { ButtonGroup, ButtonGroupSeparator } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";

type props = {
  user: niuT
}

function InviteAction({ user }: props) {
  const { mutate, isPending } = useUserInvite()

  const { copied, onCopyClk } = useClipboardCopy()

  function onCopy() {
    const pass = `${user.fullName.replace(/\s/g, "").slice(0, 4)}_${format(new Date(user?.dob), "ddMMyy")}`
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

  function invited() {
    mutate({ _id: user?._id })
  }

  return (
    <ButtonGroup className="ml-auto">
      <Button
        onClick={onCopy}
        variant="outline"
        size="sm"
      >
        {copied ? <Check /> : <Copy />}
        {copied ? "Copied" : "Copy"}
      </Button>

      <ButtonGroupSeparator />

      <Button
        onClick={invited}
        disabled={isPending}
        variant="outline"
        size="sm"
      >
        {isPending ? <Loader className="animate-spin" /> : <CheckCheck />}
        Invited
      </Button>
    </ButtonGroup>
  )
}

export default InviteAction
