"use client";

import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Cookies from 'js-cookie';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { logout } from './actions';

function Navbar() {
  const router = useRouter();
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess() {
      console.log("success");
      // Remove the auth token from cookies
      Cookies.remove("auth_token");

      // Redirect to login page
      router.push('/signin');
    },
    onError: (error) => {
      console.error("Logout failed:", error);
      // Handle logout error (e.g., show an error message to the user)
    }
  });

  const handleLogout = () => {
    // Cookies.remove('auth_token');
    // router.push('/signin');
    mutate();
  };


  return (
    <nav className="flex justify-between items-center py-4 px-6 bg-neutral-400 shadow-md">
      {/* Logo */}
      <Link href="/">
        <div className="text-xl font-bold text-gray-800">YourLogo</div>
      </Link>

      {/* User Profile Dropdown */}
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
              <p className="text-sm font-medium leading-none">Username</p>
              <p className="text-xs leading-none text-muted-foreground">
                user@example.com
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => {
              router.push('/users');
            }}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
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