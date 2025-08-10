"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from 'next/navigation';
import { EditIcon } from 'lucide-react';
import { useForm } from "react-hook-form";

import { professionalDetailsSchema, type professionalDetailsT } from '@/utils/user-schema';
import { educationLevels, professions, proffessionalSectors } from '@/utils';
import { useUpdateProfile } from '@/hooks/use-user';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ComboboxWrapper, InputWrapper } from '@/components/ui/form-wrapper';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

function Edit({ user }: { user: userT }) {
  const { mutate, isPending } = useUpdateProfile()
  const [open, setOpen] = useState(false)

  const pathname = usePathname()
  const isAdmin = pathname.includes("admin")

  const form = useForm({
    resolver: zodResolver(professionalDetailsSchema),
    defaultValues: {
      highestQualification: user?.proffessionalDetails?.highestQualification || "",
      qualifications: user?.proffessionalDetails?.qualifications || "",
      companyName: user?.proffessionalDetails?.companyName || "",
      profession: user?.proffessionalDetails?.profession || "",
      sector: user?.proffessionalDetails?.sector || "",
      salary: user?.proffessionalDetails?.salary || 0,
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
            <ComboboxWrapper
              control={form.control}
              name="highestQualification"
              label="Highest Qualification"
              options={educationLevels}
            />

            <InputWrapper
              control={form.control}
              name="qualifications"
              label="Qualifications"
            />

            <ComboboxWrapper
              control={form.control}
              name="sector"
              label="Sector"
              options={proffessionalSectors}
            />

            <ComboboxWrapper
              control={form.control}
              name="profession"
              label="Profession"
              options={professions}
              canCreateNew
            />

            <InputWrapper
              control={form.control}
              name="companyName"
              label="Company Name"
            />

            <div className="pt-2 relative">
              {!isAdmin && <p className="absolute top-1.5 right-0 text-sm text-muted-foreground">(Contact admin to update)</p>}
              <InputWrapper
                control={form.control}
                type="number"
                name="salary"
                label="Monthly Salary"
                disabled={!isAdmin}
                min={0}
                step={1000}
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
