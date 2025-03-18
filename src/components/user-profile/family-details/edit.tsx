"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUpdateProfile } from '@/hooks/use-user';
import { aliveOptions } from '@/utils';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InputWrapper, RadioWrapper } from '@/components/ui/form-wrapper';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

function Edit({ user }: { user: userT }) {
  const { mutate, isPending } = useUpdateProfile()
  const [open, setOpen] = useState(false)

  const formSchema = z.object({
    fatherName: z.string().min(2, "Father's name must be at least 2 characters"),
    motherName: z.string().min(2, "Mother's name must be at least 2 characters"),
    noOfBrothers: z.coerce.number().min(0, "Cannot be negative"),
    noOfSisters: z.coerce.number().min(0, "Cannot be negative"),
    birthOrder: z.coerce.number().min(1, "Birth order must be at least 1"),
    isFatherAlive: z.boolean(),
    isMotherAlive: z.boolean(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fatherName: user.familyDetails.fatherName,
      motherName: user.familyDetails.motherName,
      noOfBrothers: user.familyDetails.noOfBrothers,
      noOfSisters: user.familyDetails.noOfSisters,
      birthOrder: user.familyDetails.birthOrder,
      isFatherAlive: user.familyDetails.isFatherAlive,
      isMotherAlive: user.familyDetails.isMotherAlive,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const isAdmin = window.location.pathname.includes("admin")
    mutate(
      {
        ...(isAdmin && { _id: user._id }),
        familyDetails: {
          ...user.familyDetails,
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
          <DialogTitle>Edit Family Details</DialogTitle>
          <DialogDescription>Make changes to your family information here.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputWrapper
              name="fatherName"
              label="Father's Name"
              control={form.control}
            />

            <RadioWrapper
              name="isFatherAlive"
              control={form.control}
              options={aliveOptions}
            />

            <InputWrapper
              name="motherName"
              label="Mother's Name"
              control={form.control}
            />

            <RadioWrapper
              name="isMotherAlive"
              control={form.control}
              options={aliveOptions}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputWrapper
                min={0}
                step={1}
                type="number"
                name="noOfBrothers"
                label="Number of Brothers"
                control={form.control}
              />
              <InputWrapper
                min={0}
                step={1}
                type="number"
                name="noOfSisters"
                label="Number of Sisters"
                control={form.control}
              />
            </div>

            <InputWrapper
              min={1}
              step={1}
              type="number"
              name="birthOrder"
              label="Birth Order"
              control={form.control}
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
