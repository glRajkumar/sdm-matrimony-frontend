"use client";

import { FormProvider, useForm } from 'react-hook-form';
import { formatISO } from 'date-fns';
import { Loader } from 'lucide-react';
import { toast } from 'sonner';

import { useRegisterImage } from '@/hooks/use-account';
import { fieldList } from './data';

import { Button } from '@/components/ui/button';
import Fields from './fields';

type props = {
  isPending: boolean
  onSubmit: (p: Partial<userT>) => void
  isAdmin?: boolean
}

function CreateUser({ isPending, isAdmin, onSubmit }: props) {
  const methods = useForm()

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

                <div className='grid md:grid-cols-2 gap-4'>
                  <Fields
                    fields={field.list}
                  />
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
