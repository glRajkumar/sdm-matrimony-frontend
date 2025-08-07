"use client";

import Link from 'next/link';

import { useLogout } from '@/hooks/use-account';
import useUserStore from '@/store/user';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const adminLinks = [
  {
    lable: "Married users",
    href: "married",
  },
  {
    lable: "Make Match",
    href: "make-match",
  },
]

const superAdminLinks = [
  {
    lable: "Create user",
    href: "create-user",
  },
  {
    lable: "Image Extractor",
    href: "image-extractor",
  },
]

function Menu() {
  const userName = useUserStore(s => s.fullName)
  const user_id = useUserStore(s => s._id)
  const email = useUserStore(s => s.email)
  const role = useUserStore(s => s.role)

  const { mutate } = useLogout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="dc size-8 p-0 rounded-full uppercase bg-primary text-primary-foreground hover:bg-primary/90">
        {userName?.[0]}
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-40' align="end">
        <DropdownMenuLabel asChild>
          <div>
            <p className="mb-1 text-sm font-medium leading-none line-clamp-1">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground line-clamp-1">{email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {
          role === "user" &&
          <>
            <DropdownMenuItem asChild>
              <Link href={`/user/profile/${user_id}`}>
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link href="/user/account">
                Account
              </Link>
            </DropdownMenuItem>
          </>
        }

        {
          role === "admin" &&
          adminLinks.map(link => (
            <DropdownMenuItem key={link.href} asChild>
              <Link href={`/admin/${link.href}`}>
                {link.lable}
              </Link>
            </DropdownMenuItem>
          ))
        }

        {
          role === "super-admin" &&
          superAdminLinks.map(link => (
            <DropdownMenuItem key={link.href} asChild>
              <Link href={`/super-admin/${link.href}`}>
                {link.lable}
              </Link>
            </DropdownMenuItem>
          ))
        }

        <DropdownMenuItem onClick={() => mutate()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Menu
