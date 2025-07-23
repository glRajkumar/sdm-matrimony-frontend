import { Heart } from 'lucide-react';
import Link from 'next/link';
import Menu from './menu';

type props = {
  isAdmin?: boolean
}

const adminLinks = [
  {
    lable: "Create user",
    href: "create-user",
  },
  {
    lable: "Married users",
    href: "married",
  },
  {
    lable: "Make Match",
    href: "make-match",
  },
  {
    lable: "Image Extractor",
    href: "image-extractor",
  },
]

const userLinks = [
  {
    lable: "Liked",
    href: "liked",
  },
  // {
  //   lable: "Disliked",
  //   href: "disliked",
  // },
]

function Navbar({ isAdmin }: props) {
  return (
    <nav className="df gap-4 py-3 px-6 shadow-md sticky top-0 bg-white z-[1]">
      <Link href="/" className="df mr-auto">
        <span className='p-2 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full'>
          <Heart className="size-6 text-white" />
        </span>
        <span className='text-lg font-medium'>SDM</span>
      </Link>

      {
        isAdmin
          ? adminLinks.map(link => (
            <Link
              key={link.href}
              href={`/admin/${link.href}`}
              className='hover:text-pink-700'
            >
              {link.lable}
            </Link>
          ))
          : userLinks.map(link => (
            <Link
              key={link.href}
              href={`/user/${link.href}`}
              className='hover:text-pink-700'
            >
              {link.lable}
            </Link>
          ))
      }

      <Menu />
    </nav>
  )
}

export default Navbar