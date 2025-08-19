import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUpdateEmail } from "@/hooks/use-account";

import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { InputWrapper } from "@/components/ui/form-wrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

type Props = {
  onSuccess: () => void
}

const emailSchema = z.object({
  email: z.email("Please enter a valid email"),
})

type EmailFormValues = z.infer<typeof emailSchema>

function AddEmail({ onSuccess }: Props) {
  const { mutate, isPending } = useUpdateEmail()

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (values: EmailFormValues) => {
    mutate(values, { onSuccess })
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>Add Email to verify your account</DialogTitle>
        <DialogDescription>
          Unlock more features and get personalized recommendations by verifying your email.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <InputWrapper
            name="email"
            label="Email"
            control={form.control}
            placeholder="you@example.com"
            type="email"
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              type="submit"
              disabled={isPending}
            >
              Add
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </>
  )
}

export default AddEmail
