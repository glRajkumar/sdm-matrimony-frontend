"use client";

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { logout, removeToken } from '../actions';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import useUserStore from '@/store/user';

function Navbar() {
  const router = useRouter()
  const user_email = useUserStore(state => state.email)
  const user_name = useUserStore(state => state.fullName)
  const user_id = useUserStore(state => state.id)

  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess() {
      removeToken()
      router.push('/signin')
    },
    onError: (error) => {
      console.error("Logout failed:", error)
    }
  })

  const handleLogout = () => mutate()

  return (
    <nav className="df justify-between py-4 px-6 shadow-md">
      <Link href="/" className="text-xl font-bold text-gray-800">
        Logo
      </Link>
      <Link href="/pending-users" className="text-xl font-bold text-gray-800">
        pending Users
      </Link>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="@username" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user_name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user_email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              router.push(`/user/profile/${user_id}`);
            }}
          >
            Profile
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="text-red-600"
            onClick={handleLogout}
          >
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
};

export default Navbar;