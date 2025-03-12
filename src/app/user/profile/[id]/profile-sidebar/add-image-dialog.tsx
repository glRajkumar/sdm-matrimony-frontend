import { useCallback, useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { Plus, X } from 'lucide-react';
import { toast } from 'sonner';

import { useAddImages } from '@/hooks/use-user';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const acceptedFileTypes = {
  'image/*': ['.png', ".jpg", ".jpeg", ".webp"],
}

function AddImageDialog() {
  const [files, setFiles] = useState<File[]>([])
  const [open, setOpen] = useState(false)

  const { mutate, isPending } = useAddImages()

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) return toast("You may only upload 4 files at a time.")
    setFiles(prev => [...prev, ...acceptedFiles])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedFileTypes,
    maxFiles: 4,
  })

  const handleSubmit = () => {
    const formData = new FormData()
    files.forEach(file => formData.append("images", file))
    mutate(formData, {
      onSuccess() {
        setFiles([])
        setOpen(false)
      },
    })
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
          <div
            className="space-y-2"
            {...getRootProps()}
          >
            <Label htmlFor="images">Add Images</Label>
            <Input
              id="images"
              {...getInputProps({
                disabled: files.length === 4,
                style: {}
              })}
            />
          </div>

          {
            files.length > 0 &&
            <div className='df flex-wrap gap-6'>
              {
                files.map((file, index) => (
                  <div key={index} className="relative border">
                    <img
                      src={URL.createObjectURL(file)}
                      alt={`Uploaded ${index + 1}`}
                      className="w-16 h-16 object-cover rounded"
                    />

                    <button
                      onClick={() => setFiles(f => f.filter(f => f.name !== file.name))}
                      className="absolute -top-2 -right-2 bg-red-400 hover:bg-red-500 text-white rounded-full p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))
              }
            </div>
          }

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
              Add Images
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddImageDialog
