"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";

import { contactDetailsSchema } from '@/utils/user-schema';
import { useUpdateProfile } from '@/hooks/use-user';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { TextareaWrapper } from "@/components/ui/form-wrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

function Edit({ user }: { user: userT & { hasFullAccess?: boolean } }) {
  const { mutate, isPending } = useUpdateProfile()
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(contactDetailsSchema),
    defaultValues: {
      mobile: user?.contactDetails?.mobile,
      address: user?.contactDetails?.address,
    },
  })

  function onSubmit(values: z.infer<typeof contactDetailsSchema>) {
    const isAdmin = window.location.pathname.includes("admin")
    mutate(
      {
        ...(isAdmin && { _id: user._id }),
        contactDetails: {
          ...user.contactDetails,
          ...values,
        },
      },
      {
        onSuccess() {
          setOpen(false)
        }
      }
    )
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <EditIcon className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Contact Details</DialogTitle>
          <DialogDescription>Make changes to your contact information here.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <TextareaWrapper
              control={form.control}
              name="address"
              label="Address"
            />

            <div className="flex justify-end space-x-2 pt-2">
              <Button
                type="button"
                variant="outline"
                disabled={isPending}
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={isPending}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default Edit
