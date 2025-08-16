"use client";

import { Control, FieldValues, Path } from "react-hook-form";

import { useStatics } from "@/hooks/use-general";

import { ComboboxWrapper } from "@/components/ui/form-wrapper";

type props<T extends FieldValues> = {
  control: Control<T>
}
export function SelectCastesWrapper<T extends FieldValues>({ control }: props<T>) {
  const { data, isLoading } = useStatics("main-castes.json")

  return (
    <ComboboxWrapper<T>
      name={"caste" as Path<T>}
      label="Caste"
      control={control}
      options={data || []}
      isLoading={isLoading}
      placeholder="Select Caste"
    />
  )
}

type props2<T extends FieldValues> = {
  control: Control<T>
  choosed?: string
}
export function SelectSubCastesWrapper<T extends FieldValues>({ control, choosed = "" }: props2<T>) {
  const { data, isLoading } = useStatics("caste-map.json")

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
