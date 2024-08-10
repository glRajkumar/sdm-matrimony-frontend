import { getApproval } from "@/actions"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import useUserStore from "@/store/user"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

function Approval({ isOpen, onClose }: any) {
  const user_id = useUserStore(state => state?.id);
  const { toast } = useToast()
  const router = useRouter()

  const { mutate } = useMutation({
    mutationFn: getApproval,
    onSuccess(data, variables, context) {

    },
  })

  const handleButtonClick = () => {
    let payload: { id: string, approval_required: string } = {
      id: user_id,
      approval_required: "pending"
    }
    mutate(payload)
    toast({
      title: "Approval sended",
    })
    router.push("/")
  }
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Welcome!</DialogTitle>
          <DialogDescription>
            You have successfully logged in. so now you have to get approved by admin
          </DialogDescription>
          <Button
            onClick={handleButtonClick}
          >
            Get approval
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Approval
