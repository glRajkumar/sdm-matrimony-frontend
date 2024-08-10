import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

interface props {
  src: string,
  className: any,
}

export default function ImageModal({ src, className }: props) {

  return (
    <Dialog>
      <DialogTrigger asChild>
        <img
          src={src}
          alt="User"
          className={className}
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[40vw] flex justify-center">
        <img
          src={src}
          alt="User"
          className="w-[400px] h-[360px] object-cover rounded-lg shadow-lg"
        />
      </DialogContent>
    </Dialog>
  )
}