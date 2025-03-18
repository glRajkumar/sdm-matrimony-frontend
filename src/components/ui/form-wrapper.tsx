import { Control, FieldValues, Path } from "react-hook-form";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Calendar } from "./calendar";
import { Textarea } from "./textarea";
import { Button } from "./button";
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

type optionsT = readonly primitiveT[] | {
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

type TextareaWrapperProps<T extends FieldValues> = BaseWrapperProps<T> & {
  placeholder?: string;
  className?: string;
}

type DatePickerWrapperProps<T extends FieldValues> = BaseWrapperProps<T> & Omit<React.ComponentProps<typeof Calendar>, "selected" | "onSelect">

export function InputWrapper<T extends FieldValues>({ name, label, control, className, type = "text", ...props }: InputWrapperProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
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
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <RadioGroup
              value={`${field.value}`}
              onValueChange={(value) => {
                if (value === 'true') field.onChange(true)
                else if (value === 'false') field.onChange(false)
                else field.onChange(value)
              }}
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
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}

          <Select
            value={`${field.value}`}
            onValueChange={(value) => {
              if (value === 'true') field.onChange(true)
              else if (value === 'false') field.onChange(false)
              else field.onChange(value)
            }}
          >
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

export function TextareaWrapper<T extends FieldValues>({ name, label, control, className, placeholder }: TextareaWrapperProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <Textarea placeholder={placeholder} className={className} {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export function DatePickerWrapper<T extends FieldValues>({ name, label, control, className, ...calendarProps }: DatePickerWrapperProps<T>) {
  function format(date: Date) {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}

          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                >
                  {field.value ? format(field.value) : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
                {...calendarProps}
              />
            </PopoverContent>
          </Popover>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}