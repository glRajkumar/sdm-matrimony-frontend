"use client";

import { useSignup } from '@/hooks/use-account';

import CreateUser from '@/components/create-user';

function Page() {
  const { isPending, mutate } = useSignup()

  return (
    <CreateUser
      isPending={isPending}
      onSubmit={v => mutate(v)}
    />
  )
}

export default Page
