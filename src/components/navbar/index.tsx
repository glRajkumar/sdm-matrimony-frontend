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
    lable: "All users",
    href: "users",
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
    lable: "Invites",
    href: "invites",
  }
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
    <nav className="df sm:gap-4 py-3 px-6 shadow-md sticky top-0 bg-white z-[1]">
      <Link href={`/${role}`} className="df gap-0.5 mr-auto shrink-0">
        <img
          src="/logos/logo-512.webp"
          width={48}
          height={48}
          alt='SDM-logo'
        />
        <span className='hidden sm:block text-2xl font-semibold text-pink-700'>SDM</span>
      </Link>

      {
        list[role].map(link => (
          <Link
            key={link.href}
            href={`/${role}/${link.href}`}
            className='text-xs sm:text-sm lg:text-base hover:text-pink-700'
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