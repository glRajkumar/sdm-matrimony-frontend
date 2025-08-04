"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { formatISO } from 'date-fns';
import { EditIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";

import { personalDetailsSchema } from '@/utils/user-schema';
import { gender, maritalStatus } from '@/utils';
import { useUpdateProfile } from '@/hooks/use-user';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DatePickerWrapper, InputWrapper, SelectWrapper } from "@/components/ui/form-wrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

function Edit({ user }: { user: userT }) {
  const { mutate, isPending } = useUpdateProfile()
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(personalDetailsSchema),
    defaultValues: {
      fullName: user.fullName,
      gender: user.gender,
      dob: new Date(user.dob),
      maritalStatus: user.maritalStatus,
    },
  })

  function onSubmit(values: z.infer<typeof personalDetailsSchema>) {
    const isAdmin = window.location.pathname.includes("admin")
    const dob = new Date(values.dob)
    dob.setUTCHours(0, 0, 0, 0)
    mutate(
      {
        ...(isAdmin && { _id: user._id }),
        ...values,
        dob: formatISO(dob),
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
          <DialogTitle>Edit Personal Details</DialogTitle>
          <DialogDescription>Make changes to your personal information here.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputWrapper
              control={form.control}
              name="fullName"
              label="Full Name"
            />

            <SelectWrapper
              control={form.control}
              name="gender"
              label="Gender"
              options={gender}
              placeholder="Select gender"
            />

            <DatePickerWrapper
              control={form.control}
              name="dob"
              label="Date of Birth"
            />

            <SelectWrapper
              control={form.control}
              name="maritalStatus"
              label="Marital Status"
              options={maritalStatus}
              placeholder="Select marital status"
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
