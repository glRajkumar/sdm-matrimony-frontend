"use client";

import { useCallback, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useDropzone } from 'react-dropzone';
import { EditIcon, X } from 'lucide-react';
import { useForm } from "react-hook-form";

import { vedicHoroscopeSchema, type vedicHoroscopeT } from '@/utils/user-schema';
import { acceptedImagesTypes } from '@/utils';
import { useRegisterImage } from '@/hooks/use-account';
import { useUpdateProfile } from '@/hooks/use-user';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SelectListWrapper } from '@/components/common/lists';
import { InputWrapper } from "@/components/ui/form-wrapper";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";

function Edit({ user }: { user: userT }) {
  const { mutate, isPending } = useUpdateProfile()
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(vedicHoroscopeSchema),
    defaultValues: {
      nakshatra: user?.vedicHoroscope?.nakshatra || "",
      rasi: user?.vedicHoroscope?.rasi || "",
      lagna: user?.vedicHoroscope?.lagna || "",
      dashaPeriod: user?.vedicHoroscope?.dashaPeriod || "",
      vedicHoroscopePic: user?.vedicHoroscope?.vedicHoroscopePic || "",
    },
  })

  const { isPending: isPending1, mutateAsync: mutateRegisterImage } = useRegisterImage()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    form.setValue("vedicHoroscopePic", acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedImagesTypes,
    multiple: false,
    maxFiles: 1,
  })

  const file = form.watch("vedicHoroscopePic")

  async function uploadPic(image: File | string) {
    if (typeof image === "string") return image
    const formData = new FormData()
    formData.append('image', image)
    const { url } = await mutateRegisterImage(formData)
    return url
  }

  async function onSubmit(values: vedicHoroscopeT) {
    const isAdmin = window.location.pathname.includes("admin")

    if (values.vedicHoroscopePic && typeof values.vedicHoroscopePic !== "string") {
      values.vedicHoroscopePic = await uploadPic(values.vedicHoroscopePic)
    }

    mutate(
      {
        ...(isAdmin && { _id: user._id }),
        vedicHoroscope: {
          ...user.vedicHoroscope,
          ...values,
        },
      },
      {
        onSuccess() {
          setOpen(false)
        }
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <EditIcon className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Horoscope Details</DialogTitle>
          <DialogDescription>Make changes to your horoscope information here.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SelectListWrapper
              control={form.control}
              name="nakshatra"
              label="Nakshatra"
              listName="nakshatra"
              additionalOpts="Don't wish to specify"
            />

            <SelectListWrapper
              control={form.control}
              name="rasi"
              label="Rasi"
              listName="raasi"
              additionalOpts="Don't wish to specify"
            />

            <SelectListWrapper
              control={form.control}
              name="lagna"
              label="Lagna"
              listName="raasi"
              additionalOpts="Don't wish to specify"
            />

            <InputWrapper
              control={form.control}
              name="dashaPeriod"
              label="Dasha Period"
            />

            <InputWrapper
              control={form.control}
              name="dosham"
              label="Dosham"
            />

            <div className="space-y-4">
              <div
                className="space-y-2"
                {...getRootProps()}
              >
                <Label htmlFor="images">Horoscope Image</Label>
                <Input
                  id="images"
                  {...getInputProps({
                    multiple: false,
                    style: {}
                  })}
                />
              </div>

              {
                file &&
                <div className="size-40 border relative">
                  <img
                    src={typeof file === "string" ? file : URL.createObjectURL(file)}
                    alt="Horoscope"
                    className="object-cover"
                  />

                  <button
                    type="button"
                    onClick={() => form.setValue("vedicHoroscopePic", "")}
                    className="absolute top-0 right-0 p-1 bg-black/50 text-white rounded-bl cursor-pointer backdrop-blur"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              }
            </div>

            <div className="flex justify-end space-x-2 pt-2">
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
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default Edit
