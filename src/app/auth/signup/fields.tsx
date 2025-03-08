import { Controller, useFormContext } from 'react-hook-form';

import type { fields } from './data';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateTimePicker } from '@/components/ui/date-time-picker';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

type props = {
  fields: fields[]
}

function Fields({ fields }: props) {
  const { control, register, formState: { errors } } = useFormContext()

  return fields.map(field => {
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
              <DateTimePicker
                value={value}
                onChange={onChange}
                hourCycle={12}
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

export default Fields