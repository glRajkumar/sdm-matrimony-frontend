"use client";

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
}

const schema = createUserSchema.extend({
  profileImg: z.any(),
})

function CreateUser({ isPending, isAdmin, className, onSubmit }: props) {
  const methods = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues, profileImg: undefined },
  })

  const { isPending: isPending1, mutateAsync: mutateRegisterImage } = useRegisterImage()

  const handleSubmit = async (data: any) => {
    const { profileImg, ...rest } = data
    if (!rest.email && !rest?.contactDetails?.mobile) return toast('Either email or mobile is required')
    if (!profileImg) return toast('Profile image is required')

    try {
      let url = typeof profileImg === "string" ? profileImg : ""

      if (!url) {
        const formData = new FormData()
        formData.append('image', profileImg)

        const { url: urlRes } = await mutateRegisterImage(formData)
        url = urlRes
      }

      const payload = {
        ...rest,
        dob: formatISO(data?.dob),
        role: "user",
        profileImg: url,
        images: [url],
      }
      onSubmit(payload)

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
