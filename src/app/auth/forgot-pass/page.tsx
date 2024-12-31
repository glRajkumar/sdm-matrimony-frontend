"use client";

import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";

import { useForgotPass } from "@/hooks/use-account";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormValues = {
  email: string
}

type props = {
  role?: rolesT
}

function Page({ role = "user" }: props) {
  const { register, formState: { errors }, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
  })

  const { isPending, mutate } = useForgotPass()

  const onSubmit = (data: FormValues) => mutate({ ...data, role })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email is invalid",
            },
          })}
        />
        {
          errors.email &&
          <p className="text-xs text-red-400">{errors.email.message}</p>
        }
      </div>

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-pink-500 hover:bg-pink-600"
      >
        {isPending && <Loader className="animate-spin" />}
        Submit
      </Button>
    </form>
  )
}

export default Page
