"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormValues = {
  password: string
}

function Page() {
  const [showPass, setShowPass] = useState(false)

  const { register, formState: { errors }, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      password: "",
    },
  })

  const onSubmit = (data: FormValues) => {

  }

  const isPending = false

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <Label htmlFor="password">Password</Label>
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

      <Button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600"
        disabled={isPending}
      >
        {isPending ? 'Submiting...' : 'Confirm'}
      </Button>
    </form>
  )
}

export default Page
