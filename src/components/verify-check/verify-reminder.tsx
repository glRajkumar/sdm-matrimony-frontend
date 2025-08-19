import { useResendVerifyEmail } from "@/hooks/use-account";
import useUIStore from "@/store/ui";

import { DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type props = {
  email: string
  onSuccess: () => void
}

function VerifyReminder({ email, onSuccess }: props) {
  const update = useUIStore(s => s.update)

  const { mutate, isPending } = useResendVerifyEmail()

  return (
    <>
      <DialogHeader>
        <DialogTitle>Email not verified</DialogTitle>
        <DialogDescription>
          Your account email <span className="font-medium">{email}</span> is not verified yet.
        </DialogDescription>
      </DialogHeader>

      <DialogFooter className="flex justify-between">
        <Button
          size="sm"
          variant="outline"
          className="mr-auto"
          disabled={isPending}
          onClick={() => update({ remindVerification: false })}
        >
          Do not show again
        </Button>

        <DialogClose asChild>
          <Button
            size="sm"
            variant="outline"
            disabled={isPending}
          >
            Verify Later
          </Button>
        </DialogClose>


        <Button
          size="sm"
          disabled={isPending}
          onClick={() => mutate({ email }, { onSuccess })}
        >
          Verify Now
        </Button>
      </DialogFooter>
    </>
  )
}

export default VerifyReminder
