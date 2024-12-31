import { CardDescription, CardTitle } from '@/components/ui/card';

function Page() {
  return (
    <div className="dc flex-col text-center">
      <CardTitle className='text-xl'>Your application rejected</CardTitle>
      <CardDescription>Use another account <a href="/signin" className='text-pink-700 hover:underline'>Sign in</a></CardDescription>
      <div className='mt-6 text-sm text-muted-foreground'>If this was unintentional, please reach out to us <br /> <a href="tel:+917685874786" className='text-pink-700 hover:underline'>7685874786</a></div>
    </div>
  )
}

export default Page