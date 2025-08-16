"use client";

import { Control, FieldValues, Path } from "react-hook-form";

import { useStatics } from "@/hooks/use-general";

import { ComboboxWrapper } from "@/components/ui/form-wrapper";

type props<T extends FieldValues> = {
  name: Path<T>
  label?: string
  control: Control<T>
  listName: staticsNameT
  placeholder?: string
  canCreateNew?: boolean
  additionalOpts?: string | string[]
}
export function SelectListWrapper<T extends FieldValues>({ name, label, control, placeholder, listName, canCreateNew, additionalOpts }: props<T>) {
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
    />
  )
}

type props2<T extends FieldValues> = {
  control: Control<T>
  choosed: string
}
export function SelectSubCastesWrapper<T extends FieldValues>({ control, choosed = "" }: props2<T>) {
  const { data, isLoading } = useStatics("casteMap")

  return (
    <ComboboxWrapper<T>
      name={"subCaste" as Path<T>}
      label="Sub / Other Caste"
      control={control}
      options={isLoading ? [] : data?.[choosed] || []}
      isLoading={isLoading}
      placeholder="Select Sub / Other Caste"
      canCreateNew
    />
  )
}
