"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from 'lucide-react';
import { useForm } from "react-hook-form";
import { z } from "zod";

import { useUpdateProfile } from '@/hooks/use-user';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

function Edit({ user }: { user: userT }) {
  const { mutate, isPending } = useUpdateProfile()
  const [open, setOpen] = useState(false)

  const formSchema = z.object({
    nakshatra: z.string().min(2, "Nakshatra must be at least 2 characters").optional().or(z.literal("")),
    rasi: z.string().min(2, "Rasi must be at least 2 characters").optional().or(z.literal("")),
    lagna: z.string().min(2, "Lagna must be at least 2 characters").optional().or(z.literal("")),
    dashaPeriod: z.string().min(2, "Dasha period must be at least 2 characters").optional().or(z.literal("")),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nakshatra: user.vedicHoroscope.nakshatra,
      rasi: user.vedicHoroscope.rasi,
      lagna: user.vedicHoroscope.lagna,
      dashaPeriod: user.vedicHoroscope.dashaPeriod,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    const isAdmin = window.location.pathname.includes("admin")
    mutate(
      {
        ...(isAdmin && { _id: user._id }),
        vedicHoroscope: {
          ...user.vedicHoroscope,
          nakshatra: values.nakshatra,
          rasi: values.rasi,
          lagna: values.lagna,
          dashaPeriod: values.dashaPeriod,
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
          <DialogTitle>Edit Horoscope Details</DialogTitle>
          <DialogDescription>Make changes to your horoscope information here.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nakshatra"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nakshatra</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="rasi"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rasi</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lagna"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lagna</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dashaPeriod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dasha Period</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
