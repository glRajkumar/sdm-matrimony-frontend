"use client";

import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";

import { validateIdentifier } from "@/utils";
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

function ForgotPass({ role = "user" }: props) {
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

export default ForgotPass

