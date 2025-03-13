import { useFormContext, RegisterOptions, Controller, FieldValues } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type props = {
  name: string
  label?: string
  rules?: Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled">
  options: {
    label: string
    value: string
  }[]
}

function SelectWrapper({ name, label, rules = {}, options }: props) {
  const { control, formState: { errors } } = useFormContext()

  return (
    <div>
      <Label
        htmlFor={`signup-${name}`}
        className='capitalize'
      >
        {label || name}
      </Label>

      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { value, onChange } }) => (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
              <SelectValue placeholder="" />
            </SelectTrigger>

            <SelectContent>
              {
                options?.map(op => (
                  <SelectItem value={op.value} key={op.value}>
                    {op.label}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
        )}
      />

      {errors[name] &&
        // @ts-ignore
        <div className="text-xs text-red-500">{errors[name]?.message}</div>
      }
    </div>
  )
}

export default SelectWrapper
