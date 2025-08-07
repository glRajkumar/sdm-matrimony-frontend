import { Heart } from 'lucide-react';
import Link from 'next/link';
import Menu from './menu';

type props = {
  role: rolesT
}

type linkT = {
  lable: string
  href: string
}

const superAdminLinks: linkT[] = [
  {
    lable: "Married users",
    href: "married",
  },
  {
    lable: "Make Match",
    href: "make-match",
  },
]

const adminLinks: linkT[] = [
  {
    lable: "Create user",
    href: "create-user",
  },
  {
    lable: "Image Extractor",
    href: "image-extractor",
  },
]

const userLinks: linkT[] = [
  {
    lable: "Liked",
    href: "liked",
  },
  {
    lable: "Unlocked",
    href: "unlocked",
  },
]

const list: Record<rolesT, linkT[]> = {
  "super-admin": superAdminLinks,
  admin: adminLinks,
  user: userLinks,
}

function Navbar({ role = "user" }: props) {
  return (
    <nav className="df gap-4 py-3 px-6 shadow-md sticky top-0 bg-white z-[1]">
      <Link href={`/${role}`} className="df mr-auto">
        <span className='p-2 bg-gradient-to-r from-rose-400 to-pink-500 rounded-full'>
          <Heart className="size-6 text-white" />
        </span>
        <span className='text-lg font-medium'>SDM</span>
      </Link>

      {
        list[role].map(link => (
          <Link
            key={link.href}
            href={`/${role}/${link.href}`}
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