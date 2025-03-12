
import Image from "next/image";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

type props = {
  image: string
}

function ImageView({ image }: props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={image || "/placeholder.svg"}
          alt={"User Image"}
          fill
          className="object-cover rounded-md cursor-pointer"
        />
      </DialogTrigger>

      <DialogHeader>
        <DialogTitle className="sr-only">User Image</DialogTitle>
        <DialogDescription className="sr-only">View the selected image in full size.</DialogDescription>
      </DialogHeader>

      <DialogContent className="max-w-3xl">
        <div className="relative aspect-video">
          <Image src={image || "/placeholder.svg"} alt="Gallery image" fill className="object-contain" />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ImageView
