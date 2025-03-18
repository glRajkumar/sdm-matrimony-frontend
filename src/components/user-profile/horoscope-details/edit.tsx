"use client";

import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { EditIcon } from 'lucide-react';
import { useForm } from "react-hook-form";

import { vedicHoroscopeSchema, type vedicHoroscopeT } from '@/utils/user-schema';
import { useUpdateProfile } from '@/hooks/use-user';
import { nakshatra, raasi } from '@/utils';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { SelectWrapper, InputWrapper } from "@/components/ui/form-wrapper";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

function Edit({ user }: { user: userT }) {
  const { mutate, isPending } = useUpdateProfile()
  const [open, setOpen] = useState(false)

  const form = useForm<vedicHoroscopeT>({
    resolver: zodResolver(vedicHoroscopeSchema),
    defaultValues: {
      nakshatra: user?.vedicHoroscope?.nakshatra || "",
      rasi: user?.vedicHoroscope?.rasi || "",
      lagna: user?.vedicHoroscope?.lagna || "",
      dashaPeriod: user?.vedicHoroscope?.dashaPeriod || "",
    },
  })

  function onSubmit(values: vedicHoroscopeT) {
    const isAdmin = window.location.pathname.includes("admin")
    mutate(
      {
        ...(isAdmin && { _id: user._id }),
        vedicHoroscope: {
          ...user.vedicHoroscope,
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
          <DialogTitle>Edit Horoscope Details</DialogTitle>
          <DialogDescription>Make changes to your horoscope information here.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <SelectWrapper
              control={form.control}
              name="nakshatra"
              label="Nakshatra"
              options={nakshatra}
              placeholder="Select a nakshatra"
            />

            <SelectWrapper
              control={form.control}
              name="rasi"
              label="Rasi"
              options={raasi}
              placeholder="Select a rasi"
            />

            <SelectWrapper
              control={form.control}
              name="lagna"
              label="Lagna"
              options={raasi}
              placeholder="Select a lagna"
            />

            <InputWrapper
              control={form.control}
              name="dashaPeriod"
              label="Dasha Period"
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
