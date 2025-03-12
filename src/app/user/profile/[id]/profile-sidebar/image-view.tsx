import { User } from "lucide-react";
import Image from "next/image";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";

type props = {
  image: string
  images: string[]
  profileImg: string
  setAsProfilePic: (url: string) => void
}

function ImageView({ image, images, profileImg, setAsProfilePic }: props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={image || "/imgs/user.jpg"}
          alt={"User Image"}
          fill
          className="object-cover rounded-md cursor-pointer border"
        />
      </DialogTrigger>

      <DialogHeader>
        <DialogTitle className="sr-only">User Image</DialogTitle>
        <DialogDescription className="sr-only">View the selected image in full size.</DialogDescription>
      </DialogHeader>

      <DialogContent>
        <Carousel>
          <CarouselContent>
            {
              images.map(img => (
                <CarouselItem key={img}>
                  <div>
                    <div className="relative w-full h-80">
                      <Image src={img} alt="Gallery image" fill className="object-contain" />
                    </div>

                    {
                      profileImg !== img &&
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => setAsProfilePic(img)}
                        className="flex mx-auto mt-4"
                      >
                        <User className="h-4 w-4" /> Set As Profile Pic
                      </Button>
                    }
                  </div>
                </CarouselItem>
              ))
            }
          </CarouselContent>

          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      </DialogContent>
    </Dialog>
  )
}

export default ImageView
