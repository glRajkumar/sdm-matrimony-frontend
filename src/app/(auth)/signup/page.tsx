"use client";

import { Controller, useForm } from 'react-hook-form';

import { fieldList } from './data';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DatePicker } from '@/components/ui/date-picker';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

function Page() {
  const { control, handleSubmit, register, formState: { errors } } = useForm<any>()

  const onSubmit = (data: any) => {

  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id='signup-form'>
      <div className='grid md:grid-cols-2 gap-4 -mr-8 pl-1 pr-8 pb-4 max-h-[50vh] overflow-y-auto'>
        {
          fieldList.map(field => {
            if (field.type === "select") {
              return (
                <div key={field.name}>
                  <Label
                    htmlFor={`signup-${field.name}`}
                    className='capitalize'
                  >
                    {field?.label || field?.name}
                  </Label>

                  <Controller
                    name={field.name}
                    control={control}
                    rules={field?.rules || {}}
                    render={({ field: { value, onChange } }) => (
                      <Select value={value} onValueChange={onChange}>
                        <SelectTrigger>
                          <SelectValue placeholder="" />
                        </SelectTrigger>

                        <SelectContent>
                          {
                            field?.options?.map(op => (
                              <SelectItem value={op.value} key={op.value}>
                                {op.label}
                              </SelectItem>
                            ))
                          }
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors[field.name] &&
                    // @ts-ignore
                    <div className="text-xs text-red-500">{errors[field.name]?.message}</div>
                  }
                </div>
              )
            }

            if (field?.name === "dob") {
              return (
                <div key={field.name}>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Controller
                    name={field.name}
                    control={control}
                    rules={field?.rules || {}}
                    render={({ field: { value, onChange } }) => (
                      <DatePicker
                        selected={value}
                        onChange={onChange}
                        calendarProps={{ mode: "single" }}
                      />
                    )}
                  />
                  {errors[field.name] &&
                    // @ts-ignore
                    <div className="text-xs text-red-500">{errors[field.name]?.message}</div>
                  }
                </div>
              )
            }

            return (
              <div key={field.name}>
                <Label
                  htmlFor={`signup-${field.name}`}
                  className='capitalize'
                >
                  {field?.label || field?.name}
                </Label>

                <Input
                  id={`signup-${field.name}`}
                  type={field.type}
                  {...register(field.name, field?.rules || {})}
                  className='no-number-arrows'
                />

                {errors[field.name] &&
                  // @ts-ignore
                  <div className="text-xs text-red-500">{errors[field.name]?.message}</div>
                }
              </div>
            )
          })
        }
      </div>

      <Button
        type="submit"
        className="mt-6 w-full bg-pink-500 hover:bg-pink-600"
      >
        Sign Up
      </Button>
    </form>
  )
}

export default Page
