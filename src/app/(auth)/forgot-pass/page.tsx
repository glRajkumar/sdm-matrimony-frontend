"use client";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type FormValues = {
  email: string
}

function Page() {
  const { register, formState: { errors }, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (data: FormValues) => {

  }

  const isPending = false

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
        className="w-full bg-pink-500 hover:bg-pink-600"
        disabled={isPending}
      >
        {isPending ? 'Submiting...' : 'Submit'}
      </Button>
    </form>
  )
}

export default Page
