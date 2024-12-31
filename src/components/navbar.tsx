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

function Navbar() {
  const userName = useUserStore(s => s.fullName)
  const user_id = useUserStore(s => s._id)
  const email = useUserStore(s => s.email)

  const { mutate } = useLogout()

  return (
    <nav className="df justify-between py-4 px-6 shadow-md">
      <Link href="/" className="text-xl font-bold text-gray-800">
        Logo
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger className="dc size-8 p-0 rounded-full uppercase bg-primary text-primary-foreground hover:bg-primary/90">
          {userName?.[0]}
        </DropdownMenuTrigger>

        <DropdownMenuContent className='w-40' align="end">
          <DropdownMenuLabel asChild>
            <div>
              <p className="mb-1 text-sm font-medium leading-none">{userName}</p>
              <p className="text-xs leading-none text-muted-foreground">{email}</p>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href={`/user/profile/${user_id}`}>
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={() => mutate()}>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;