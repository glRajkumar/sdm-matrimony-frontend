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
    <nav className="df gap-4 py-4 px-6 shadow-md sticky top-0 bg-white z-[1]">
      <Link href="/" className="mr-auto text-xl font-bold text-gray-800">
        Logo
      </Link>

      {
        isAdmin
          ? adminLinks.map(link => (
            <Link
              key={link.href}
              href={`/admin/${link.href}`}
            >
              {link.lable}
            </Link>
          ))
          : userLinks.map(link => (
            <Link
              key={link.href}
              href={`/user/${link.href}`}
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