import Link from "next/link";

import { Button } from "@/components/ui/button";

function Nav() {
  return (
    <nav className="bg-card/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="df h-16">
          <img
            src="/logos/logo-512.webp"
            width={48}
            height={48}
            alt='SDM-logo'
          />

          <span className="hidden sm:block text-2xl font-bold bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent">
            SD Matrimony
          </span>

          <Link href="#contact" className="hidden md:block md:ml-auto md:mr-4 text-gray-700 hover:text-rose-500 transition-colors font-medium">
            Contact
          </Link>

          <div className="df gap-4 ml-auto md:ml-0">
            <Button variant="outline" asChild>
              <Link href="/auth/user/signup">
                Sign Up
              </Link>
            </Button>

            <Button asChild className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white px-6">
              <Link href="/auth/user/signin">
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
