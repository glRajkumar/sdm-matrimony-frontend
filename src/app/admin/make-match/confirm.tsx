import { useState } from "react";

import { useUserMarriedToMutate } from "@/hooks/use-admin";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type props = {
  male: Partial<userT> | null
  female: Partial<userT> | null
  onConfirm: () => void
}

function Confirm({ male, female, onConfirm }: props) {
  const [isOpen, setIsOpen] = useState(false)
  const { mutate, isPending } = useUserMarriedToMutate()

  function onSubmit() {
    mutate({
      _id: male?._id || "",
      marriedTo: female?._id || ""
    })

    onConfirm()
  }

  return (
    <AlertDialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className="dc md:col-span-2">
        <AlertDialogTrigger
          disabled={isPending || !male || !female}
          asChild
        >
          <Button>
            Make Match
          </Button>
        </AlertDialogTrigger>
      </div>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Match</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to make this match?
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid md:grid-cols-2 gap-4">
          {
            male &&
            <div className="col-span-1">
              <img src={male?.profileImg || ""} alt={male?.fullName || "Profile Image"} />
              <p>{male?.fullName}</p>
            </div>
          }

          {
            female &&
            <div className="col-span-1">
              <img src={female?.profileImg || ""} alt={female?.fullName || "Profile Image"} />
              <p>{female?.fullName}</p>
            </div>
          }
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel
            disabled={isPending}
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={isPending}
            onClick={onSubmit}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Confirm

