import { Control, FieldValues, Path } from "react-hook-form";
import { CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Calendar } from "./calendar";
import { Textarea } from "./textarea";
import { Combobox } from "./combobox";
import { Button } from "./button";
import { Input } from "./input";

type BaseWrapperProps<T extends FieldValues> = {
  name: Path<T>
  label?: string
  control: Control<T>
  className?: string
}

type InputWrapperProps<T extends FieldValues> = BaseWrapperProps<T> & React.InputHTMLAttributes<HTMLInputElement>

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


type TextareaWrapperProps<T extends FieldValues> = BaseWrapperProps<T> & React.TextareaHTMLAttributes<HTMLTextAreaElement>

export function TextareaWrapper<T extends FieldValues>({ name, label, control, className, ...rest }: TextareaWrapperProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <Textarea {...rest} {...field} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

type RadioWrapperProps<T extends FieldValues> = BaseWrapperProps<T> & {
  options: optionsT
}
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
                  key={typeof option === "object" ? `${option.value}` : `${option}`}
                  className="flex items-center space-x-1"
                >
                  <FormControl>
                    <RadioGroupItem value={typeof option === "object" ? `${option.value}` : `${option}`} />
                  </FormControl>
                  <FormLabel className="font-normal">
                    {typeof option === "object" ? `${option.label}` : `${option}`}
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

type SelectWrapperProps<T extends FieldValues> = BaseWrapperProps<T> & {
  options: optionsT
  placeholder?: string
}
export function SelectWrapper<T extends FieldValues>({ name, label, control, className, options, placeholder }: SelectWrapperProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("relative", className)}>
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
                <SelectValue placeholder={placeholder ?? `Select ${label}`} />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              {options.map((option) => (
                <SelectItem
                  key={typeof option === "object" ? `${option.value}` : `${option}`}
                  value={typeof option === "object" ? `${option.value}` : `${option}`}
                >
                  {typeof option === "object" ? `${option.label}` : `${option}`}
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

type DatePickerWrapperProps<T extends FieldValues> = BaseWrapperProps<T> & Omit<React.ComponentProps<typeof Calendar>, "selected" | "onSelect">
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

type ComboboxWrapperProps<T extends FieldValues> = BaseWrapperProps<T> & {
  options: optionsT
  placeholder?: string
  emptyMessage?: string
}

export function ComboboxWrapper<T extends FieldValues>({ name, label, control, className, options, placeholder, emptyMessage }: ComboboxWrapperProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <Combobox
              options={options}
              placeholder={placeholder}
              emptyMessage={emptyMessage}
              value={`${field.value}`}
              onValueChange={(value) => {
                if (value === 'true') field.onChange(true)
                else if (value === 'false') field.onChange(false)
                else field.onChange(value)
              }}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
