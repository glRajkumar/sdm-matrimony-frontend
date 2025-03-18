"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from 'lucide-react';
import { useForm } from "react-hook-form";

import { professionalDetailsSchema, type professionalDetailsT } from '@/utils/user-schema';
import { useUpdateProfile } from '@/hooks/use-user';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InputWrapper } from '@/components/ui/form-wrapper';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { Form } from "@/components/ui/form";

function Edit({ user }: { user: userT }) {
  const { mutate, isPending } = useUpdateProfile()
  const [open, setOpen] = useState(false)

  const form = useForm<professionalDetailsT>({
    resolver: zodResolver(professionalDetailsSchema),
    defaultValues: {
      qualification: user?.proffessionalDetails?.qualification || "",
      work: user?.proffessionalDetails?.work || "",
    },
  })

  function onSubmit(values: professionalDetailsT) {
    const isAdmin = window.location.pathname.includes("admin")
    mutate(
      {
        ...(isAdmin && { _id: user._id }),
        proffessionalDetails: {
          ...user.proffessionalDetails,
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
          <DialogTitle>Edit Professional Details</DialogTitle>
          <DialogDescription>Make changes to your professional information here.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <InputWrapper
              control={form.control}
              name="qualification"
              label="Qualification"
            />

            <InputWrapper
              control={form.control}
              name="work"
              label="Work"
            />

            <div className="pt-2">
              <div className="flex items-center space-x-2">
                <Label>Annual Salary</Label>
                <p className="text-sm text-muted-foreground">(Not editable)</p>
              </div>
              <Input
                className="mt-1"
                value={`₹${user?.proffessionalDetails?.salary}`}
                disabled
              />
            </div>

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
