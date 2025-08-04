"use client";

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { formatISO } from 'date-fns';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import { z } from "zod";

import { defaultValues, fieldList } from './data';
import { createUserSchema } from '@/utils/user-schema';
import { useRegisterImage } from '@/hooks/use-account';
import { cn } from '@/lib/utils';

import FieldWrapper from './field-wrapper';
import { Button } from '@/components/ui/button';

type props = {
  isPending: boolean
  onSubmit: (p: Partial<userT>) => void
  isAdmin?: boolean
  className?: string
  extractedData?: string[]
}

function getDefaultExtractedData(uploaded: string[]) {
  const profileImg = uploaded[1]
  const images = [uploaded[uploaded.length - 1]]
  const vedicHoroscopePic = uploaded[uploaded.length - 2]

  return {
    ...defaultValues,
    profileImg,
    images,
    vedicHoroscope: {
      ...defaultValues.vedicHoroscope,
      vedicHoroscopePic,
    },
  }
}

function CreateUser({ isPending, isAdmin, className, extractedData, onSubmit }: props) {
  const methods = useForm({
    resolver: zodResolver(createUserSchema),
    defaultValues: extractedData ? getDefaultExtractedData(extractedData) : { ...defaultValues },
  })

  const { isPending: isPending1, mutateAsync: mutateRegisterImage } = useRegisterImage()

  const sector = methods.watch("proffessionalDetails.sector")

  useEffect(() => {
    if (sector === "Unemployed") {
      methods.setValue("proffessionalDetails.salary", 0)
      methods.setValue("proffessionalDetails.profession", "Unemployed")
      methods.setValue("proffessionalDetails.companyName", "")
      methods.clearErrors([
        "proffessionalDetails.salary",
        "proffessionalDetails.profession",
        "proffessionalDetails.companyName",
      ])
    }
  }, [sector])

  async function uploadPic(image: File | string) {
    if (typeof image === "string") return image
    const formData = new FormData()
    formData.append('image', image)
    const { url } = await mutateRegisterImage(formData)
    return url
  }

  const handleSubmit = async (data: z.infer<typeof createUserSchema>) => {
    const { profileImg, ...rest } = data
    if (!rest.email && !rest?.contactDetails?.mobile) return toast('Either email or mobile is required')
    if (!profileImg) return toast('Profile image is required')

    try {
      let url = await uploadPic(profileImg)

      const images = [url]

      if (data?.images?.length) {
        const urls = await Promise.all(data.images.map(uploadPic))
        images.push(...urls)
      }

      if (data.vedicHoroscope.vedicHoroscopePic) {
        data.vedicHoroscope.vedicHoroscopePic = await uploadPic(data.vedicHoroscope.vedicHoroscopePic)
      }

      if (data.vedicHoroscope.nakshatra) {
        data.vedicHoroscope.nakshatra = data.vedicHoroscope.nakshatra.split(" (")[0]
      }
      if (data.vedicHoroscope.rasi) {
        data.vedicHoroscope.rasi = data.vedicHoroscope.rasi.split(" (")[0]
      }
      if (data.vedicHoroscope.lagna) {
        data.vedicHoroscope.lagna = data.vedicHoroscope.lagna.split(" (")[0]
      }

      const dob = new Date(data?.dob)
      dob.setUTCHours(0, 0, 0, 0)

      const payload = {
        ...rest,
        dob: formatISO(dob),
        role: "user",
        profileImg: url,
        images,
      }

      onSubmit(payload as Partial<userT>)

    } catch (error) {
      toast('Failed to register')
    }
  }

  return (
    <FormProvider {...methods}>
      <form
        id='signup-form'
        onSubmit={methods.handleSubmit(handleSubmit)}
        className={cn('-mr-8 pl-1 pr-8 max-h-[50vh] overflow-y-auto divide-y relative isolate', className)}
      >
        {
          fieldList.map(field => (
            <div key={field.lable} className='py-8'>
              <h4 className="mb-2 text-sm font-semibold text-gray-500">
                {field.lable}
              </h4>

              <div className='grid md:grid-cols-2 items-start gap-4'>
                {
                  field.list.map(field => (
                    <FieldWrapper
                      key={field.name}
                      control={methods.control}
                      {...field}
                    />
                  ))
                }
              </div>
            </div>
          ))
        }

        <div className='py-2 sticky -bottom-px z-[1] bg-white'>
          <Button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600"
          >
            {(isPending || isPending1) && <Loader className="animate-spin" />}
            {isAdmin ? "Create User" : "Sign Up"}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default CreateUser
