"use client";

import { useState } from 'react';
import { Control, FieldValues, Path } from "react-hook-form";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { parsePrimitive } from '@/utils';
import { cn } from "@/lib/utils";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./form";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { Combobox, MultiSelectCombobox } from "./combobox";
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

type InputWrapperProps<T extends FieldValues> = BaseWrapperProps<T> & React.InputHTMLAttributes<HTMLInputElement>
export function InputWrapper<T extends FieldValues>({ name, label, control, className, type = "text", placeholder, ...props }: InputWrapperProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <Input type={type} placeholder={placeholder || `Enter ${label}`} {...field} {...props} />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

type TextareaWrapperProps<T extends FieldValues> = BaseWrapperProps<T> & React.TextareaHTMLAttributes<HTMLTextAreaElement>
export function TextareaWrapper<T extends FieldValues>({ name, label, control, className, placeholder, ...rest }: TextareaWrapperProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <Textarea placeholder={placeholder || `Enter ${label}`} {...rest} {...field} />
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
        <FormItem className={cn("relative", className)}>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <RadioGroup
              value={`${field.value}`}
              onValueChange={value => field.onChange(parsePrimitive(value))}
              className="flex items-center gap-12"
            >
              {options.map((option) => (
                <FormItem
                  key={typeof option === "object" ? `${option.value}` : `${option}`}
                  className="flex items-center flex-row space-x-1"
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
            onValueChange={value => field.onChange(parsePrimitive(value))}
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
  const [open, setOpen] = useState(false)

  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          {label && <FormLabel>{label}</FormLabel>}

          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                >
                  {field.value ? format(field.value, "dd/MM/yyyy") : <span>Pick a date</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>

            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                autoFocus
                mode="single"
                captionLayout="dropdown"
                selected={field.value}
                onSelect={(date: any) => {
                  field.onChange(date)
                  setOpen(false)
                }}
                defaultMonth={field.value}
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
  isLoading?: boolean
  placeholder?: string
  canCreateNew?: boolean
  emptyMessage?: string
}
export function ComboboxWrapper<T extends FieldValues>({ name, label, control, className, placeholder, ...rest }: ComboboxWrapperProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("relative", className)}>
          {label && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <Combobox
              {...rest}
              placeholder={placeholder || `Select ${label}`}
              value={`${field.value || ""}`}
              onValueChange={value => field.onChange(parsePrimitive(value))}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}

type MultiSelectComboboxWrapperProps<T extends FieldValues> = BaseWrapperProps<T> & {
  options: optionsT
  isLoading?: boolean
  placeholder?: string
  emptyMessage?: string
  inlineLable?: boolean
}
export function MultiSelectComboboxWrapper<T extends FieldValues>({ name, label, control, className, placeholder, inlineLable = false, ...rest }: MultiSelectComboboxWrapperProps<T>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={cn("relative", className)}>
          {label && !inlineLable && <FormLabel>{label}</FormLabel>}

          <FormControl>
            <MultiSelectCombobox
              {...rest}
              value={field.value}
              lable={inlineLable ? label : ""}
              placeholder={inlineLable ? "" : placeholder || `Select ${label}`}
              onValueChange={val => field.onChange(val.map(parsePrimitive))}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
