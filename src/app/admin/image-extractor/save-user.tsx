
import { useCreateUsersMutate } from '@/hooks/use-admin';
import { dataT } from './type';

import CreateUser from '@/components/create-user';
import { Button } from '@/components/ui/button';

type props = {
  data: dataT;
  updateStep: (step: number, data: dataT | null) => void;
}

function SaveUser({ data, updateStep }: props) {
  const { isPending, mutate } = useCreateUsersMutate()

  function onSubmit(user: Partial<userT>) {
    mutate([user], {
      onSuccess() {
        updateStep(0, null)
      }
    })
  }

  return (
    <section className="grid md:grid-cols-2 gap-4 p-6">
      <div className='df justify-end py-2 md:col-span-2'>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => updateStep(0, null)}
        >
          Delete Process
        </Button>
      </div>

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
        isAdmin
        isPending={isPending}
        extractedData={data?.uploaded || []}
        onSubmit={onSubmit}
        className='p-6 mr-8 max-h-[80vh] border rounded-lg'
      />
    </section>
  )
}

export default SaveUser
