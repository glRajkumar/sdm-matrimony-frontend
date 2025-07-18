"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useForm } from "react-hook-form";

import { validateIdentifier } from "@/utils";
import { useResetPass } from "@/hooks/use-account";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormValues = {
  email: string
  password: string
  otp: string
}

type props = {
  role?: rolesT
}

function ResetPass({ role = "user" }: props) {
  const [showPass, setShowPass] = useState(false)

  const { register, formState: { errors }, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
      otp: "",
    },
  })

  const { isPending, mutate } = useResetPass()

  const onSubmit = (data: FormValues) => mutate({ ...data, role })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Label htmlFor="email">Email or Mobile Number</Label>

        <Input
          id="email"
          {...register("email", {
            validate: validateIdentifier,
          })}
        />
        {
          errors.email &&
          <p className="text-xs text-red-400">{errors.email.message}</p>
        }
      </div>

      <div className="mb-4">
        <Label htmlFor="password">New Password</Label>

        <div className="relative">
          <Input
            id="password"
            type={showPass ? "text" : "password"}
            className="pr-8"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters",
              },
            })}
          />
          <button
            type="button"
            className="p-1 absolute right-1 top-1/2 -translate-y-1/2 hover:text-pink-600"
            onClick={() => setShowPass(p => !p)}
          >
            {!showPass ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
          </button>
        </div>

        {
          errors.password &&
          <div className="text-xs text-red-400">{errors.password.message}</div>
        }
      </div>

      <div className="mb-8">
        <Label htmlFor="otp">OTP</Label>

        <Input
          id="otp"
          type="number"
          className="no-number-arrows"
          {...register("otp", {
            valueAsNumber: true,
            required: "OTP is required",
          })}
        />
        {
          errors.otp &&
          <p className="text-xs text-red-400">{errors.otp.message}</p>
        }
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-pink-500 hover:bg-pink-600"
      >
        {isPending && <Loader className="animate-spin" />}

        Confirm
      </Button>
    </form>
  )
}

export default ResetPass
