import { Dialog, DialogContent, DialogDescription, DialogOverlay, DialogTitle } from "@/components/ui/dialog"

function ApprovalModal({ isOpen, onClose }: any) {
  return (
    <div>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogOverlay />
        <DialogContent>
          <DialogTitle>Welcome!</DialogTitle>
          <DialogDescription>
            You have successfully logged in. Some pages are restricted until an admin approves your access
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ApprovalModal
