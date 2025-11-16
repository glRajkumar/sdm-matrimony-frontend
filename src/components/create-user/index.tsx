"use client";

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from 'lucide-react';
import { format } from "date-fns";
import { toast } from 'sonner';
import { z } from "zod";

import { defaultValues, fieldList } from './data';

import { detectInputType, filterObj, validateIdentifier } from '@/utils';
import { contactDetailsSchema, createUserSchema } from '@/utils/user-schema';
import { useIsExists, useRegisterImage } from '@/hooks/use-account';
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
  const profileImg = uploaded[0]
  // const images = [uploaded[uploaded.length - 1]]
  const vedicHoroscopePic = uploaded[uploaded.length - 1]

  return {
    ...defaultValues,
    profileImg,
    // images,
    vedicHoroscope: {
      ...defaultValues.vedicHoroscope,
      vedicHoroscopePic,
    },
  }
}

function getSchema(isAdmin: boolean) {
  return isAdmin
    ? createUserSchema.extend({
      email: z.string().optional(),
      password: z.string().optional(),
      contactDetails: contactDetailsSchema.extend({
        mobile: z.string().regex(/^\d{10}$/, "Must be a valid 10-digit number"),
      }),
    })
    : createUserSchema
}

function CreateUser({ isPending, isAdmin, className, extractedData, onSubmit }: props) {
  const methods = useForm({
    resolver: zodResolver(getSchema(!!isAdmin)),
    defaultValues: extractedData ? getDefaultExtractedData(extractedData) : { ...defaultValues },
  })

  const { isPending: isPending1, mutateAsync: mutateRegisterImage } = useRegisterImage()
  const { isPending: isPending2, mutateAsync } = useIsExists()

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

  async function checkAvailability(name: any, val: string) {
    const isEmail = detectInputType(val)
    const key = isEmail === "email" ? "Email" : "Mobile number"
    const isValid = validateIdentifier(val)
    if (isValid !== true) {
      toast.error(isValid)
      methods.setError(name, { message: isValid })
      return false
    }

    const { isExists } = await mutateAsync(val)
    if (!isExists) {
      methods.clearErrors(name)
      return true
    }

    const message = `${key} already exists`
    toast.error(message)
    methods.setError(name, { message })
    return false
  }

  async function uploadPic(image: File | string) {
    if (typeof image === "string") return image
    const formData = new FormData()
    formData.append('image', image)
    const { url } = await mutateRegisterImage(formData)
    return url
  }

  const handleSubmit = async (data: z.infer<ReturnType<typeof getSchema>>) => {
    const { profileImg, ...rest } = data
    if (!isAdmin && !rest?.email && !rest?.contactDetails?.mobile) {
      return toast.error('Either email or mobile is required')
    }
    // if (!profileImg) return toast.error('Profile image is required')

    try {
      if (rest?.email) {
        const isValid = await checkAvailability("email", rest?.email)
        if (!isValid) return
      }

      if (rest?.contactDetails?.mobile) {
        const isValid = await checkAvailability("contactDetails.mobile", rest?.contactDetails?.mobile)
        if (!isValid) return
      }

      let url = ""
      const images: string[] = []

      if (profileImg) {
        url = await uploadPic(profileImg)
        images.push(url)
      }

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

      const payload = {
        ...rest,
        dob: new Date(new Date(data?.dob).setHours(0, 0, 0, 0)).toISOString(),
        role: "user",
        profileImg: url,
        images,
      }

      if (isAdmin) {
        payload.password = `${rest.fullName.replace(/\s/g, "").slice(0, 4)}_${format(new Date(data?.dob), "ddMMyy")}`
      }

      onSubmit(filterObj(payload) as Partial<userT>)

    } catch (error: any) {
      toast.error('Failed to register', {
        description: error?.message || ""
      })
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
          fieldList
            .filter(field => isAdmin ? field.lable !== "Account Details" : true)
            .map(field => (
              <div key={field.lable} className='py-8 @container'>
                <h4 className="mb-2 text-sm font-semibold text-gray-500">
                  {field.lable}
                </h4>

                <div className='grid @md:grid-cols-2 items-start gap-4'>
                  {
                    field.list.map(field => (
                      <FieldWrapper
                        key={field.name}
                        control={methods.control}
                        onBlur={checkAvailability}
                        {...field}
                      />
                    ))
                  }
                </div>
              </div>
            ))
        }

        <div className='py-2 sticky -bottom-px z-1 bg-white'>
          <Button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600"
            disabled={isPending || isPending1 || isPending2}
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
