"use client";

import { useCreateUsersMutate } from '@/hooks/use-admin';

import CreateUser from '@/components/create-user';

function Page() {
  const { isPending, mutate } = useCreateUsersMutate()

  return (
    <CreateUser
      isAdmin
      isPending={isPending}
      onSubmit={v => mutate([v])}
    />
  )
}

export default Page
