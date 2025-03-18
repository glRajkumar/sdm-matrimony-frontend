import { useCallback, useState } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";

import { acceptedImagesTypes } from "@/utils/enums";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type props = {
  name: string
  label?: string
  rules?: RegisterOptions
}

export function SelectImageWrapper({ name, label, rules }: props) {
  const [file, setFile] = useState<File | null>(null)

  const { register, formState: { errors }, setValue } = useFormContext()

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFile(acceptedFiles[0])
    setValue(name, acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedImagesTypes,
    multiple: false,
    maxFiles: 1,
  })

  return (
    <div className="md:col-span-2">
      <Label htmlFor={`signup-${name}`} className='capitalize'>{label}</Label>

      <div
        {...getRootProps()}
        className=" size-40 rounded object-cover border-2 border-dashed border-muted-foreground"
      >
        <Input
          type="file"
          {...register(name, rules)}
          {...getInputProps()}
          className="hidden"
        />

        {
          file &&
          <img
            src={URL.createObjectURL(file)}
            alt="user"
            className="size-full object-cover"
          />
        }
      </div>

      {errors[name] &&
        // @ts-ignore
        <div className="text-xs text-red-500">{errors?.[name]?.message}</div>
      }
    </div>
  )
}
