"use client";

import { HelpCircle } from "lucide-react";
import Link from "next/link";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import NumberCopy from "@/app/super-admin/invites/number-copy";

type acc = {
  role: string
  link: string
  email: string
  password: string
}

const dummyAccounts: acc[] = [
  {
    role: "User",
    link: "/auth/user/signin",
    email: "raj@gmail.com",
    password: "12345678",
  },
  {
    role: "Admin",
    link: "/auth/admin/signin",
    email: "admin@gmail.com",
    password: "12345678",
  },
  {
    role: "Super Admin",
    link: "/auth/admin/signin",
    email: "admin@sdmatrimony.com",
    password: "12345678",
  },
]

function Wrapper({ num, title, children }: { title: string, num: number, children: React.ReactNode }) {
  return (
    <div>
      <div className="df">
        <span className="dc w-8 h-8 flex-shrink-0 text-sm font-semibold rounded-full bg-primary text-primary-foreground">
          {num}
        </span>
        <h3 className="font-semibold text-foreground">{title}</h3>
      </div>

      <div className="sm:pl-10 text-sm text-muted-foreground">
        {children}
      </div>
    </div>
  )
}

function Card({ role, link, email, password }: acc) {
  return (
    <div className="grid @sm:grid-cols-2 gap-4 p-4 border border-border rounded-lg bg-muted/30 text-foreground">
      <div className="df justify-between @sm:col-span-2 font-medium">
        <p>{role}</p>
        <p className="text-xs text-right"><Link target="_blank" href={link} className=" text-pink-400 hover:underline">Signin Link</Link></p>
      </div>

      <div>
        <p className="text-xs font-medium">Email</p>
        <NumberCopy number={email} />
      </div>

      <div>
        <p className="text-xs font-medium">Password</p>
        <NumberCopy number={password} />
      </div>
    </div>
  )
}

function Instructions() {
  return (
    <Dialog>
      <DialogTrigger
        className="fixed bottom-6 right-6 z-40 p-3 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-colors opacity-40 hover:opacity-100 cursor-pointer"
        aria-label="Open instructions"
        id="open-instr"
      >
        <HelpCircle className="w-6 h-6" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">Welcome to Demo Site</DialogTitle>
          <DialogDescription>Here's everything you need to know to get started</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 pr-6 -mr-6 max-h-[80vh] overflow-y-auto">
          <Wrapper
            num={1}
            title="This is a Demo Site"
          >
            You can do anything on this site. Feel free to explore, test features, and experiment without any restrictions.
            You can visit live website in the folloing link - <a target="_blank" href="https://sdmatrimony.com" className=" text-pink-400 hover:underline">SDM</a>
          </Wrapper>

          <Wrapper
            num={2}
            title="Create a New Account"
          >
            You can create a new account on the signup page with any dummy email or phone number. Visit <Link target="_blank" className=" text-pink-400 hover:underline" href="/auth/user/signup">Signup</Link>
          </Wrapper>

          <Wrapper
            num={3}
            title="Dummy Accounts for Testing"
          >
            Use these pre-created accounts to login and test different user roles:

            <div className="mt-4 space-y-4 @container">
              {dummyAccounts.map(account => (
                <Card key={account.role} {...account} />
              ))}
            </div>
          </Wrapper>

          <Wrapper
            num={4}
            title="PhonePay payment"
          >
            You can phonepay's allowed data to enter in the payment option. Visit <Link target="_blank" className=" text-pink-400 hover:underline" href="https://developer.phonepe.com/payment-gateway/uat-testing-go-live/uat-sandbox">Instructions for testing</Link>. You can use success@ybl, failed@ybl, or any value as card number (or use 4242 4242 4242 4242)
          </Wrapper>

          <Wrapper
            num={5}
            title="Image Extractor"
          >
            You can download the folloing link <Link download target="_blank" className="text-pink-400 hover:underline" href="/dummy.jpeg">Testing Image</Link> to be used in Image Extractor section.
          </Wrapper>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default Instructions
