
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function CreateAdmin() {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Admin</DialogTitle>
          <DialogDescription>
            Fill the form to create a new admin.
          </DialogDescription>
        </DialogHeader>

        <form>

          <DialogFooter>
            <DialogClose asChild>
              <Button>Close</Button>
            </DialogClose>

            <Button type="submit">Create</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default CreateAdmin
