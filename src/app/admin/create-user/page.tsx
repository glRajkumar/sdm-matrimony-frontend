"use client";

import { useState } from 'react';

import { useCreateUsersMutate } from '@/hooks/use-admin';

import CreateUser from '@/components/create-user';

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
    <CreateUser
      key={key}
      isAdmin
      isPending={isPending}
      onSubmit={onSubmit}
    />
  )
}

export default Page
