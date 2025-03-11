import { useState } from 'react';
import { EditIcon } from 'lucide-react';
import Image from 'next/image';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function EditProfileImageDialog({ user, onUpdate }: { user: userT; onUpdate: (data: Partial<userT>) => void }) {
  const [open, setOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState(user.profileImg)

  const handleSubmit = () => {
    onUpdate({ profileImg: imageUrl })
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full h-8 w-8"
        >
          <EditIcon className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
          <DialogDescription>Change your profile picture. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="relative w-40 h-40">
              <Image src={imageUrl || "/placeholder.svg"} alt="Profile" fill className="rounded-full object-cover" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileImageDialog
