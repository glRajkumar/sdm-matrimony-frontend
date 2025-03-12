import { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { EditIcon } from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

import { useAddImages } from '@/hooks/use-user';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const acceptedFileTypes = {
  'image/*': ['.png', ".jpg", ".jpeg", ".webp"],
}

function EditProfileImageDialog() {
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const { mutate, isPending } = useAddImages()

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) return toast("You may only upload 1 file at a time.")
    setFile(acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    multiple: false,
    maxFiles: 1,
  })

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append("images", file!)
    formData.append("isProfilePic", "true")

    mutate(formData, {
      onSuccess() {
        setOpen(false)
      },
    })
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
          {
            file &&
            <div className="flex justify-center">
              <div className="relative w-40 h-40">
                <Image src={file ? URL.createObjectURL(file) : "/imgs/user.jpg"} alt="Profile" fill className="rounded-full object-cover" />
              </div>
            </div>
          }

          <div
            className="space-y-2"
            {...getRootProps()}
          >
            <Label htmlFor="images">Profile Image</Label>
            <Input
              id="images"
              {...getInputProps({
                multiple: false,
                style: {}
              })}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              disabled={isPending}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              disabled={isPending}
              onClick={handleSubmit}
            >
              Save
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileImageDialog
