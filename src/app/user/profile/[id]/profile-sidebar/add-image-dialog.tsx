
import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function AddImageDialog({ onAddImage }: { onAddImage: (imageUrl: string) => void }) {
  const [open, setOpen] = useState(false)
  const [imageUrl, setImageUrl] = useState("")

  const handleSubmit = () => {
    if (imageUrl.trim()) {
      onAddImage(imageUrl)
      setImageUrl("")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="aspect-square flex items-center justify-center border-2 border-dashed rounded-md cursor-pointer hover:bg-muted/50 transition-colors">
          <Plus className="h-8 w-8 text-muted-foreground" />
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Photo</DialogTitle>
          <DialogDescription>Add a new photo to your gallery. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newImageUrl">Image URL</Label>
            <Input
              id="newImageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Add Photo</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddImageDialog
