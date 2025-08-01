"use client";

import { useForm, FormProvider } from "react-hook-form";
import { Loader } from "lucide-react";

import { useUpdatePassword } from "@/hooks/use-account";

import { Button } from "@/components/ui/button";

import PasswordField from "./password-field";

type formFields = {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

type props = {
  onSuccess: () => void
}

function UpdatePass({ onSuccess }: props) {
  const methods = useForm<formFields>({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    }
  })

  const { mutate, isPending } = useUpdatePassword()

  function handleSubmit({ confirmPassword, ...data }: formFields) {
    mutate(data, { onSuccess })
  }

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(handleSubmit)}
        className="space-y-4 p-4 border rounded-lg bg-muted/50"
      >
        <PasswordField
          name="oldPassword"
          label="Current"
        />

        <PasswordField
          name="newPassword"
          label="New"
          validate={(val, { oldPassword }) => val !== oldPassword || "New password must be different from current password"}
        />

        <PasswordField
          name="confirmPassword"
          label="Confirm"
          validate={(val, { newPassword }) => val === newPassword || "Confirm password must be same as new password"}
        />

        <div className="flex gap-2 pt-2">
          <Button
            size="sm"
            type="submit"
            disabled={isPending}
          >
            {isPending && <Loader className="animate-spin" />}
            Update Password
          </Button>

          <Button
            size="sm"
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={onSuccess}
          >
            Cancel
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}

export default UpdatePass
