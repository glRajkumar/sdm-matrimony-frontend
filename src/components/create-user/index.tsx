"use client";

import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { formatISO } from 'date-fns';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';

import { createUserSchema, type userInputT } from '@/utils/user-schema';
import { defaultValues, fieldList } from './data';
import { useRegisterImage } from '@/hooks/use-account';

import FieldWrapper from './field-wrapper';
import { Button } from '@/components/ui/button';

type props = {
  isPending: boolean
  onSubmit: (p: Partial<userT>) => void
  isAdmin?: boolean
}

function CreateUser({ isPending, isAdmin, onSubmit }: props) {
  const methods = useForm<userInputT>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { ...defaultValues },
  })

  const { isPending: isPending1, mutateAsync: mutateRegisterImage } = useRegisterImage()

  const handleSubmit = async (data: any) => {
    const { profileImg, ...rest } = data
    if (!profileImg) return toast('Profile image is required')

    try {
      const formData = new FormData()
      formData.append('image', profileImg)

      const { url } = await mutateRegisterImage(formData)

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
      <form onSubmit={methods.handleSubmit(handleSubmit)} id='signup-form'>
        <div className='-mr-8 pl-1 pr-8 pb-4 max-h-[50vh] overflow-y-auto divide-y'>
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
        </div>

        <Button
          type="submit"
          className="mt-6 w-full bg-pink-500 hover:bg-pink-600"
        >
          {(isPending || isPending1) && <Loader className="animate-spin" />}
          {isAdmin ? "Create User" : "Sign Up"}
        </Button>
      </form>
    </FormProvider>
  )
}

export default CreateUser
