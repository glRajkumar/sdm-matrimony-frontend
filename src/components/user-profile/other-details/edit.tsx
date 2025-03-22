"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from 'lucide-react';
import { useForm } from "react-hook-form";

import { otherDetailsSchema, type otherDetailsT } from '@/utils/user-schema';
import { castes, languages, religions } from '@/utils';
import { useUpdateProfile } from '@/hooks/use-user';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ComboboxWrapper, InputWrapper } from "@/components/ui/form-wrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

function Edit({ user }: { user: userT }) {
  const { mutate, isPending } = useUpdateProfile()
  const [open, setOpen] = useState(false)

  const form = useForm<otherDetailsT>({
    resolver: zodResolver(otherDetailsSchema),
    defaultValues: {
      motherTongue: user?.otherDetails?.motherTongue || "",
      houseType: user?.otherDetails?.houseType || "",
      religion: user?.otherDetails?.religion || "",
      height: user?.otherDetails?.height || "",
      color: user?.otherDetails?.color || "",
      caste: user?.otherDetails?.caste || "",
    },
  })

  function onSubmit(values: otherDetailsT) {
    const isAdmin = window.location.pathname.includes("admin")
    mutate(
      {
        ...(isAdmin && { _id: user._id }),
        otherDetails: {
          ...user.otherDetails,
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
          <DialogTitle>Edit Other Details</DialogTitle>
          <DialogDescription>Make changes to your additional information here.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ComboboxWrapper
              control={form.control}
              name="motherTongue"
              label="Mother Tongue"
              options={languages}
              placeholder="Select mother tongue"
            />

            <InputWrapper
              control={form.control}
              name="houseType"
              label="House Type"
            />

            <InputWrapper
              control={form.control}
              name="height"
              label="Height"
            />

            <InputWrapper
              control={form.control}
              name="color"
              label="Complexion"
            />

            <ComboboxWrapper
              control={form.control}
              name="religion"
              label="Religion"
              options={religions}
              placeholder="Select religion"
            />

            <ComboboxWrapper
              control={form.control}
              name="caste"
              label="Caste"
              options={castes}
              placeholder="Select caste"
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
