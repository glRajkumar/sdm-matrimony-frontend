import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";

import { DateTimePicker } from '@/components/ui/date-time-picker';
import { Controller } from 'react-hook-form';

type props = {
  field: {
    name: string
    rules?: any
  }
}

function SelectDateWrapper({ field }: props) {
  const { control, formState: { errors } } = useFormContext()

  return (
    <div>
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

export default SelectDateWrapper
