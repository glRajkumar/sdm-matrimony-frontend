"use client";

import { useSignup } from '@/hooks/use-account';

import CreateUser from '@/components/create-user';

function Page() {
  const { isPending, mutate } = useSignup()

  return (
    <CreateUser
      isPending={isPending}
      onSubmit={v => mutate(v)}
      className='max-h-[65vh]'
    />
  )
}

export default Page
