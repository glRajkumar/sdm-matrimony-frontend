import { SelectSubCastesWrapper } from "../common/lists";
import { useFormContext } from "react-hook-form";

type props = {
  name: string
  additionalOpts?: string | string[]
  className?: string
}

export function SubCaste({ name, additionalOpts, className }: props) {
  const { control, watch } = useFormContext()
  const choosed = watch(name.replace("subCaste", "caste"))

  return (
    <SelectSubCastesWrapper
      name={name}
      control={control}
      choosed={choosed}
      additionalOpts={additionalOpts}
      className={className}
    />
  )
}
