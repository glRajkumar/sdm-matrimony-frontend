"use client";
import { useState } from 'react';

import { useCreateUsersMutate } from '@/hooks/use-admin';

import CreateUser from '@/components/create-user';
import Extractor from "./extractor";

function Page() {
  const [key, setKey] = useState(0)

  const { isPending, mutate } = useCreateUsersMutate()

  function onSubmit(user: Partial<userT>) {
    mutate([user], {
      onSuccess() {
        setKey(p => p + 1)
      }
    })
  }

  return (
    <section className="grid md:grid-cols-2 gap-4">
      <Extractor />

      <CreateUser
        key={key}
        isAdmin
        isPending={isPending}
        onSubmit={onSubmit}
        className='p-6 mt-8 mr-8 max-h-[80vh] border rounded-lg'
      />
    </section>
  )
}

export default Page