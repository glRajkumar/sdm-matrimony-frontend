"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";

import { castes, languages, maritalStatus, religions } from '@/utils';
import { useUpdateProfile } from '@/hooks/use-user';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InputWrapper, SelectWrapper, TextareaWrapper } from "@/components/ui/form-wrapper";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { Form } from "@/components/ui/form";

function Edit({ user }: { user: userT }) {
  const { mutate, isPending } = useUpdateProfile()
  const [open, setOpen] = useState(false)

  const formSchema = z.object({
    minAge: z.coerce.number().min(18, "Minimum age must be at least 18").optional().or(z.literal("")),
    maxAge: z.coerce.number().min(18, "Maximum age must be at least 18").optional().or(z.literal("")),
    religion: z.string().min(2, "Religion must be at least 2 characters").optional().or(z.literal("")),
    caste: z.string().optional().or(z.literal("")),
    qualification: z.string().optional().or(z.literal("")),
    work: z.string().optional().or(z.literal("")),
    motherTongue: z.string().optional().or(z.literal("")),
    location: z.string().optional().or(z.literal("")),
    expectation: z.string().optional().or(z.literal("")),
    maritalStatus: z.enum(maritalStatus).optional().or(z.literal("")),
  })
    .refine(
      (data) =>
        (typeof data.minAge === "number" && typeof data.maxAge === "number")
          ? data.minAge < data.maxAge
          : true,
      {
        message: "Minimum age must be less than maximum age",
        path: ["minAge"],
      }
    )
    .refine(
      (data) =>
        (typeof data.minAge === "number" && typeof data.maxAge === "number")
          ? data.minAge !== data.maxAge
          : true,
      {
        message: "Minimum age and maximum age should not be equal",
        path: ["minAge"],
      }
    )

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      minAge: user?.partnerPreferences?.minAge || "",
      maxAge: user?.partnerPreferences?.maxAge || "",
      religion: user?.partnerPreferences?.religion || "",
      caste: user?.partnerPreferences?.caste || "",
      qualification: user?.partnerPreferences?.qualification || "",
      work: user?.partnerPreferences?.work || "",
      motherTongue: user?.partnerPreferences?.motherTongue || "",
      location: user?.partnerPreferences?.location || "",
      expectation: user?.partnerPreferences?.expectation || "",
      maritalStatus: user?.partnerPreferences?.maritalStatus || "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const isAdmin = window.location.pathname.includes("admin")
    mutate(
      {
        ...(isAdmin && { _id: user._id }),
        partnerPreferences: {
          ...user.partnerPreferences,
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
          <DialogTitle>Edit Partner Preferences</DialogTitle>
          <DialogDescription>Make changes to your partner preferences here.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[60vh] -ml-1 -mr-6 pl-1 pr-6 overflow-y-auto">
            <div className="grid grid-cols-2 gap-4 items-start">
              <InputWrapper
                control={form.control}
                name="minAge"
                label="Minimum Age"
                type="number"
                min={18}
              />

              <InputWrapper
                control={form.control}
                name="maxAge"
                label="Maximum Age"
                type="number"
                min={18}
              />
            </div>

            <SelectWrapper
              control={form.control}
              name="religion"
              label="Religion"
              options={religions}
              placeholder="Select religion"
            />

            <SelectWrapper
              control={form.control}
              name="caste"
              label="Caste"
              options={castes}
              placeholder="Select caste"
            />

            <SelectWrapper
              control={form.control}
              name="maritalStatus"
              label="Marital Status"
              options={maritalStatus}
              placeholder="Select marital status"
            />

            <InputWrapper
              control={form.control}
              name="qualification"
              label="Qualification"
            />

            <InputWrapper
              control={form.control}
              name="work"
              label="Profession"
            />

            <div className="pt-2">
              <div className="flex items-center space-x-2">
                <Label>Expected Salary</Label>
                <p className="text-sm text-muted-foreground">(Not editable)</p>
              </div>
              <Input value={`₹ ${user?.partnerPreferences?.salary || "-"}`} disabled className="mt-1" />
            </div>

            <SelectWrapper
              control={form.control}
              name="motherTongue"
              label="Mother Tongue"
              options={languages}
              placeholder="Select mother tongue"
            />

            <InputWrapper
              control={form.control}
              name="location"
              label="Location"
            />

            <TextareaWrapper
              control={form.control}
              name="expectation"
              label="Expectations"
              className="min-h-[100px]"
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
