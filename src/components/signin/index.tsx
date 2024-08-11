"use client"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitHandler, useForm } from "react-hook-form"
import useUserStore from "@/store/user"
import { useToast } from "../ui/use-toast"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { LoginUser, setToken } from "@/actions"
import { Button } from "../ui/button"
import ApprovalModal from "@/components/approval-modal"

type FormFileds = {
  email: string;
  password: string;
}

function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFileds>()

  const updateUser = useUserStore((state: any) => state.updateUser)
  const approval_status = useUserStore(state => state?.approvalStatus)

  const router = useRouter()
  const { toast } = useToast()

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const { mutate } = useMutation({
    mutationFn: LoginUser,
    onSuccess: (data: any) => {
      const { token, ...rest } = data
      if (token) {
        setToken(token)
        updateUser(rest)
        toast({
          title: "Success",
          description: "You have successfully logged in.",
        });
        approval_status !== "rejected" && router.push('/')
        setIsAuthenticated(true);
        setShowModal(true);
      } else {
        console.error("No token received in login response")
      }
    },
    onError() {
      toast({
        title: "Error",
        description: "Error While logged in.",
      });
    }
  })

  const onSubmit: SubmitHandler<FormFileds> = data => mutate(data)

  return (
    <section className="min-h-screen flex items-center justify-center mx-4 md:mx-0">

      <form onSubmit={handleSubmit(onSubmit)}>

        <Card className="mx-auto max-w-sm">

          <CardHeader>
            <CardTitle className="text-2xl font-semibold">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="ruby@gmail.com"
                  required
                  // className="p-2 border h-8 border-gray-300 min-w-[200px] mb-4"
                  {...register("email", {
                    required: "email is required",
                    validate: (value) => {
                      if (!value.includes("@")) {
                        return "must be include @ charector";
                      }
                      return true;
                    },
                  })}
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>

              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  {/* <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link> */}
                </div>
                <Input
                  id="password"
                  type="password"
                  // className="p-2 border h-8 border-gray-300 min-w-[200px] mb-4"
                  {...register("password", {
                    required: "password is required",
                    minLength: {
                      value: 6,
                      message: "password must be 8 charecters",
                    },
                  })}
                  required
                />
              </div>

              <Button className="w-full bg-[#4F6F52] text-white py-1 px-4 text-[13px] sm:text-[15px]">
                {isSubmitting ? "Loading..." : "Login"}
              </Button>

            </div>

            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href={"/signup"} className="text-blue-600">
                Sign up
              </Link>
            </div>

          </CardContent>
        </Card>

      </form>

      {isAuthenticated && approval_status === "pending" && (
        <ApprovalModal
          isOpen={showModal}
          onClose={() => setShowModal(false)} />
      )}

    </section>
  )
}
export default SignIn