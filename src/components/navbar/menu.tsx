"use client";

import { Loader } from 'lucide-react';
import Link from 'next/link';

import { useLogout, useUserDetailsMini } from '@/hooks/use-account';

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
  {
    lable: "Test Payment",
    href: "test-payment",
  },
]

function Menu() {
  const { data: user, isLoading } = useUserDetailsMini()
  const userName = user?.fullName
  const role = user?.role

  const { mutate } = useLogout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="dc size-8 p-0 shrink-0 rounded-full uppercase bg-primary text-primary-foreground hover:bg-primary/90"
        disabled={isLoading}
      >
        {isLoading && <Loader className="size-4 animate-spin" />}
        {!isLoading && userName?.[0]}
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-40' align="end">
        <DropdownMenuLabel asChild>
          <div>
            <p className="mb-1 text-sm font-medium leading-none line-clamp-1">{userName}</p>
            <p className="text-xs leading-none text-muted-foreground line-clamp-1">{user?.email}</p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {
          role === "user" &&
          <>
            <DropdownMenuItem asChild>
              <Link href={`/user/profile/${user?._id}`}>
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
          !isLoading && role === "admin" &&
          adminLinks.map(link => (
            <DropdownMenuItem key={link.href} asChild>
              <Link href={`/admin/${link.href}`}>
                {link.lable}
              </Link>
            </DropdownMenuItem>
          ))
        }

        {
          !isLoading && role === "super-admin" &&
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
