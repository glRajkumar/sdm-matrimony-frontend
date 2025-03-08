"use client";

import { FormProvider, useForm } from 'react-hook-form';
import { formatISO } from 'date-fns';
import { Loader } from 'lucide-react';

import { useSignup } from '@/hooks/use-account';
import { fieldList } from './data';

import { Button } from '@/components/ui/button';
import Fields from './fields';

function Page() {
  const methods = useForm()

  const { isPending, mutate } = useSignup()

  const onSubmit = (data: any) => {
    const payload = {
      ...data,
      dob: formatISO(data?.dob),
      role: "user",
    }
    mutate(payload)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} id='signup-form'>
        <div className='-mr-8 pl-1 pr-8 pb-4 max-h-[50vh] overflow-y-auto'>
          {
            fieldList.map(field => (
              <div key={field.lable} className='mb-8'>
                <h4 className="text-sm font-semibold text-gray-400">
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
          {isPending && <Loader className="animate-spin" />}
          Sign Up
        </Button>
      </form>
    </FormProvider>
  )
}

export default Page
