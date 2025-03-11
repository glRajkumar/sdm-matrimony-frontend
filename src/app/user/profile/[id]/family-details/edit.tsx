"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Edit({ user }: { user: userT }) {
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
    // onUpdate({
    //   familyDetails: {
    //     ...user.familyDetails,
    //     fatherName: values.fatherName,
    //     motherName: values.motherName,
    //     noOfBrothers: values.noOfBrothers,
    //     noOfSisters: values.noOfSisters,
    //     birthOrder: values.birthOrder,
    //     isFatherAlive: values.isFatherAlive,
    //     isMotherAlive: values.isMotherAlive,
    //   },
    // })
    setOpen(false)
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
            <FormField
              control={form.control}
              name="fatherName"
              render={({ field }) => (
                <FormItem className='mb-2'>
                  <FormLabel>Father's Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFatherAlive"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel className='sr-only'>Father Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(value === "true")}
                      defaultValue={field.value ? "true" : "false"}
                      className="flex items-center gap-12"
                    >
                      <FormItem className="flex items-center space-x-1">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Alive</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">Deceased</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="motherName"
              render={({ field }) => (
                <FormItem className='mb-2'>
                  <FormLabel>Mother's Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isMotherAlive"
              render={({ field }) => (
                <FormItem className="mb-6">
                  <FormLabel className='sr-only'>Mother Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={(value) => field.onChange(value === "true")}
                      defaultValue={field.value ? "true" : "false"}
                      className="flex items-center gap-12"
                    >
                      <FormItem className="flex items-center space-x-1">
                        <FormControl>
                          <RadioGroupItem value="true" />
                        </FormControl>
                        <FormLabel className="font-normal">Alive</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-1">
                        <FormControl>
                          <RadioGroupItem value="false" />
                        </FormControl>
                        <FormLabel className="font-normal">Deceased</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="noOfBrothers"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Brothers</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={0} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="noOfSisters"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Sisters</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" min={0} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="birthOrder"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Birth Order</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min={1} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" onClick={() => setOpen(false)} type="button">
                Cancel
              </Button>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default Edit
