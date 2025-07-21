import { CardDescription, CardTitle } from '@/components/ui/card';
import Refresh from './refresh';

type props = {
  title: string
}

function InfoCard({ title }: props) {
  return (
    <div className="dc flex-col text-center">
      <CardTitle className='text-xl'>{title}</CardTitle>
      <CardDescription>
        <Refresh /> or Use another account <a href="/auth/user/signin" className='text-pink-700 hover:underline'>Sign in</a>
      </CardDescription>

      <div className='mt-6 text-sm text-muted-foreground'>
        If this was unintentional, please reach out to us <br />
        <a href="tel:+919791155234" className='text-pink-700 hover:underline'>9791155234</a>
      </div>
    </div>
  )
}

export default InfoCard