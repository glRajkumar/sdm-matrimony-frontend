"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from 'lucide-react';
import { useForm } from "react-hook-form";

import { partnerPreferencesSchema, type partnerPreferencesT } from '@/utils/user-schema';
import { useUpdateProfile } from '@/hooks/use-user';
import { maritalStatus } from '@/utils';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { InputWrapper, SelectWrapper, TextareaWrapper } from "@/components/ui/form-wrapper";
import { SelectListWrapper, SelectSubCastesWrapper } from '@/components/common/lists';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from '@/components/ui/input';
import { Form } from "@/components/ui/form";

function Edit({ user }: { user: userT }) {
  const { mutate, isPending } = useUpdateProfile()
  const [open, setOpen] = useState(false)

  const form = useForm({
    resolver: zodResolver(partnerPreferencesSchema),
    defaultValues: {
      minAge: user?.partnerPreferences?.minAge || "",
      maxAge: user?.partnerPreferences?.maxAge || "",
      religion: user?.partnerPreferences?.religion || "",
      caste: user?.partnerPreferences?.caste || "",
      subCaste: user?.partnerPreferences?.subCaste || "",
      minQualification: user?.partnerPreferences?.minQualification || "",
      sector: user?.partnerPreferences?.sector || "",
      profession: user?.partnerPreferences?.profession || "",
      minSalary: user?.partnerPreferences?.minSalary || "",
      motherTongue: user?.partnerPreferences?.motherTongue || "",
      location: user?.partnerPreferences?.location || "",
      expectation: user?.partnerPreferences?.expectation || "",
      maritalStatus: user?.partnerPreferences?.maritalStatus || "",
    },
  })

  const choosed = form.watch("caste")

  function onSubmit(values: partnerPreferencesT) {
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

            <SelectListWrapper
              control={form.control}
              name="religion"
              label="Religion"
              listName="religions"
              additionalOpts="Any"
              canCreateNew
            />

            <SelectListWrapper
              control={form.control}
              name="caste"
              label="Caste"
              listName="castes"
              additionalOpts="Any"
              canCreateNew
            />

            <SelectSubCastesWrapper
              name="subCaste"
              control={form.control}
              choosed={choosed || ""}
              additionalOpts="Any"
            />

            <SelectWrapper
              control={form.control}
              name="maritalStatus"
              label="Marital Status"
              options={maritalStatus}
              placeholder="Select marital status"
            />

            <SelectListWrapper
              control={form.control}
              name="minQualification"
              label="Minimum Qualification"
              listName="educationLevels"
              additionalOpts="Any"
            />

            <SelectListWrapper
              control={form.control}
              name="sector"
              label="Sector"
              listName="sectors"
              additionalOpts="Any"
            />

            <SelectListWrapper
              control={form.control}
              name="profession"
              label="Profession"
              listName="professions"
              additionalOpts="Any"
              canCreateNew
            />

            <div className="pt-2">
              <div className="flex items-center space-x-2">
                <Label>Expected Salary</Label>
                <p className="text-sm text-muted-foreground">(Not editable)</p>
              </div>
              <Input value={`₹ ${user?.partnerPreferences?.minSalary || "-"}`} disabled className="mt-1" />
            </div>

            <SelectListWrapper
              control={form.control}
              name="motherTongue"
              label="Mother Tongue"
              listName="languages"
              additionalOpts="Any"
              canCreateNew
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
