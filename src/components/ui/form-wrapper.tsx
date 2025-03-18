import { Control, FieldValues, Path } from "react-hook-form";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Input } from "./input";

type BaseWrapperProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  control: Control<T>
  className?: string
}
type InputWrapperProps<T extends FieldValues> = BaseWrapperProps<T> & {
  type?: "text" | "email" | "password" | "tel" | "number"
} & React.InputHTMLAttributes<HTMLInputElement>

type primitiveT = string | number | boolean

type optionsT = primitiveT[] | {
  label: string
  value: primitiveT
}[]

type RadioWrapperProps<T extends FieldValues> = BaseWrapperProps<T> & {
  options: optionsT
}

type SelectWrapperProps<T extends FieldValues> = BaseWrapperProps<T> & {
  options: optionsT
  placeholder?: string
}

export function InputWrapper<T extends FieldValues>({ name, label, control, className, type = "text", ...props }: InputWrapperProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input type={type} {...props} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

const isOptionObject = (option: any): option is { label: string; value: primitiveT } => {
  return typeof option === 'object' && 'label' in option && 'value' in option;
};

export function RadioWrapper<T extends FieldValues>({ name, label, control, className, options }: RadioWrapperProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              value={`${field.value}`}
              onValueChange={field.onChange}
              className="flex items-center gap-12"
            >
              {options.map((option) => (
                <FormItem
                  key={`${isOptionObject(option) ? option.value : option}`}
                  className="flex items-center space-x-1"
                >
                  <FormControl>
                    <RadioGroupItem value={isOptionObject(option) ? `${option.value}` : `${option}`} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {isOptionObject(option) ? option.label : option}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function SelectWrapper<T extends FieldValues>({ name, label, control, className, options, placeholder }: SelectWrapperProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}
          <Select onValueChange={field.onChange} value={`${field.value}`}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={`${isOptionObject(option) ? option.value : option}`}
                  value={isOptionObject(option) ? `${option.value}` : `${option}`}
                >
                  {isOptionObject(option) ? option.label : option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}