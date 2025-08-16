import { useCallback } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { useDropzone } from "react-dropzone";

import { acceptedImagesTypes } from "@/utils/enums";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";

type props = {
  name: string
  label?: string
  rules?: RegisterOptions
  className?: string
}

export function SelectImageWrapper({ name, label, rules, className }: props) {
  const { register, formState: { errors }, setValue, watch } = useFormContext()
  const file = watch(name)

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setValue(name, acceptedFiles[0])
  }, [])

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedImagesTypes,
    multiple: false,
    maxFiles: 1,
  })

  return (
    <div className={className}>
      <Label htmlFor={`signup-${name}`} className='capitalize mb-2'>{label}</Label>

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
            src={typeof file === "string" ? file : URL.createObjectURL(file)}
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

export function SelectMultiImageWrapper({ name, label, rules, className }: props) {
  const { register, formState: { errors }, setValue, watch } = useFormContext()
  const files = watch(name) || []

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = [...files, ...acceptedFiles].slice(0, 4)
    setValue(name, newFiles)
  }, [files, name, setValue])

  const handleRemoveImage = (index: number) => {
    const updatedFiles = files.filter((_: any, i: number) => i !== index)
    setValue(name, updatedFiles)
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: acceptedImagesTypes,
    multiple: true,
    maxFiles: 4,
  })

  return (
    <div className={className}>
      <Label htmlFor={`signup-${name}`} className="capitalize mb-2">{label}</Label>

      <div className="df gap-4 p-2 overflow-x-auto border">
        {
          files.length > 0 &&
          files.map((file: File | string, index: number) => (
            <div key={index} className="relative size-32 shrink-0 rounded overflow-hidden border">
              <img
                src={typeof file === "string" ? file : URL.createObjectURL(file)}
                alt={`preview-${index}`}
                className="size-full object-cover"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-0 right-0 p-1 bg-black/50 text-white rounded-bl cursor-pointer backdrop-blur"
              >
                <X size={16} />
              </button>
            </div>
          ))
        }

        {
          files.length < 4 &&
          <div
            {...getRootProps()}
            className="dc size-32 p-2 shrink-0 rounded border-2 border-dashed border-muted-foreground cursor-pointer"
          >
            <Input
              type="file"
              {...register(name, rules)}
              {...getInputProps()}
              className="hidden"
            />

            <p className="text-xs text-gray-400 text-center">Can upload upto 4 files</p>
          </div>
        }
      </div>

      {errors[name] &&
        // @ts-ignore
        <div className="text-xs text-red-500">{errors?.[name]?.message}</div>
      }
    </div>
  )
}
