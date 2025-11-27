"use client";

import { Control, FieldValues, Path } from "react-hook-form";

import { useStatics } from "@/hooks/use-general";

import { ComboboxWrapper } from "@/components/ui/form-wrapper";

type BaseProps<T extends FieldValues> = {
  name: Path<T>
  control: Control<T>
  additionalOpts?: string | string[]
}

type props<T extends FieldValues> = BaseProps<T> & {
  label?: string
  listName: staticsNameT
  placeholder?: string
  canCreateNew?: boolean
  className?: string
}
export function SelectListWrapper<T extends FieldValues>({ name, label, control, placeholder, listName, canCreateNew, className, additionalOpts }: props<T>) {
  const { data, isLoading } = useStatics(listName)

  return (
    <ComboboxWrapper
      name={name}
      label={label}
      control={control}
      options={isLoading ? [] : [
        ...(additionalOpts ? typeof additionalOpts === "string" ? [additionalOpts] : additionalOpts : []),
        ...(data || [])
      ]}
      isLoading={isLoading}
      placeholder={placeholder || `Select ${label}`}
      canCreateNew={canCreateNew}
      className={className}
    />
  )
}

type props2<T extends FieldValues> = BaseProps<T> & {
  choosed: string
  className?: string
}
export function SelectSubCastesWrapper<T extends FieldValues>({ name, control, choosed = "", className, additionalOpts }: props2<T>) {
  const { data, isLoading } = useStatics("casteMap")

  return (
    <ComboboxWrapper
      name={name}
      label="Sub / Other Caste"
      control={control}
      options={isLoading ? [] : [
        ...(additionalOpts ? typeof additionalOpts === "string" ? [additionalOpts] : additionalOpts : []),
        ...(data?.[choosed] || [])
      ]}
      isLoading={isLoading}
      placeholder="Select Sub / Other Caste"
      className={className}
      canCreateNew
    />
  )
}
