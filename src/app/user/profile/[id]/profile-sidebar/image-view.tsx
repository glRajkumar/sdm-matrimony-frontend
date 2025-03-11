
import Image from "next/image";
import { X } from "lucide-react";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type props = {
  selectedImage: string
  isImageViewOpen: boolean
  setIsImageViewOpen: React.Dispatch<React.SetStateAction<boolean>>
}

function ImageView({ selectedImage, isImageViewOpen, setIsImageViewOpen }: props) {
  return (
    <Dialog open={isImageViewOpen} onOpenChange={setIsImageViewOpen}>
      <DialogContent className="max-w-3xl p-0 overflow-hidden">
        <div className="relative aspect-video">
          {selectedImage && (
            <Image src={selectedImage || "/placeholder.svg"} alt="Gallery image" fill className="object-contain" />
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
            onClick={() => setIsImageViewOpen(false)}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImageView
