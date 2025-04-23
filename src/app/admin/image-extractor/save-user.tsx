import { useState } from 'react';

import { useCreateUsersMutate } from '@/hooks/use-admin';
import { dataT } from './type';

import CreateUser from '@/components/create-user';

type props = {
  data: dataT;
  updateStep: (step: number, data: dataT | null) => void;
}

function SaveUser({ data, updateStep }: props) {
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
    <section className="grid md:grid-cols-2 gap-4 p-6">
      {
        data?.image &&
        <div className='p-2 border rounded'>
          <img
            src={data?.image.src}
            alt="Original"
            className="w-full h-auto select-none"
            draggable="false"
          />
        </div>
      }

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

export default SaveUser
