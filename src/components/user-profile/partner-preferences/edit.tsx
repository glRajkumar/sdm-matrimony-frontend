"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUpdateProfile } from '@/hooks/use-user';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function Edit({ user }: { user: userT }) {
  const { mutate, isPending } = useUpdateProfile()
  const [open, setOpen] = useState(false)

  const formSchema = z.object({
    minAge: z.coerce.number().min(18, "Minimum age must be at least 18").optional().or(z.literal("")),
    maxAge: z.coerce.number().min(18, "Maximum age must be at least 18").optional().or(z.literal("")),
    religion: z.string().min(2, "Religion must be at least 2 characters").optional().or(z.literal("")),
    caste: z.string(),
    qualification: z.string(),
    work: z.string(),
    motherTongue: z.string(),
    location: z.string(),
    expectation: z.string(),
    maritalStatus: z.enum(["Single", "Divorced", "Widowed"] as const).optional().or(z.literal("")),
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
              <FormField
                control={form.control}
                name="minAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minimum Age</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={18} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxAge"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Age</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={18} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="religion"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Religion</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="caste"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Caste</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maritalStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Marital Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select marital status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Single">Single</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                      <SelectItem value="Widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="qualification"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualification</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="work"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profession</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="pt-2">
              <div className="flex items-center space-x-2">
                <Label>Expected Salary</Label>
                <p className="text-sm text-muted-foreground">(Not editable)</p>
              </div>
              <Input value={`₹ ${user?.partnerPreferences?.salary || "-"}`} disabled className="mt-1" />
            </div>
            <FormField
              control={form.control}
              name="motherTongue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mother Tongue</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expectation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expectations</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[100px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
