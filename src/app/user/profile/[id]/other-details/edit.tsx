import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Edit({ user, onUpdate }: { user: userT; onUpdate: (data: Partial<userT>) => void }) {
  const [open, setOpen] = useState(false)

  const formSchema = z.object({
    motherTongue: z.string().min(2, "Mother tongue must be at least 2 characters"),
    houseType: z.string().min(2, "House type must be at least 2 characters"),
    height: z.string().min(2, "Height must be at least 2 characters"),
    color: z.string().min(2, "Complexion must be at least 2 characters"),
    caste: z.string().min(2, "Caste must be at least 2 characters"),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      motherTongue: user.otherDetails.motherTongue,
      houseType: user.otherDetails.houseType,
      height: user.otherDetails.height,
      color: user.otherDetails.color,
      caste: user.otherDetails.caste,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    onUpdate({
      otherDetails: {
        ...user.otherDetails,
        motherTongue: values.motherTongue,
        houseType: values.houseType,
        height: values.height,
        color: values.color,
        caste: values.caste,
      },
    })
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
          <DialogTitle>Edit Other Details</DialogTitle>
          <DialogDescription>Make changes to your additional information here.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
              name="houseType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>House Type</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Complexion</FormLabel>
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
