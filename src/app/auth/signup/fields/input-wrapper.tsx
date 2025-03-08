import { useFormContext, RegisterOptions } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type props = {
  name: string
  label?: string
  type?: "text" | "number" | "email" | "password"
  rules?: RegisterOptions
}

function InputWrapper({ label, name, type = "text", rules = {} }: props) {
  const { register, formState: { errors } } = useFormContext()

  return (
    <div>
      <Label
        htmlFor={`signup-${name}`}
        className='capitalize'
      >
        {label || name}
      </Label>

      <Input
        id={`signup-${name}`}
        type={type}
        {...register(name, rules)}
        className='no-number-arrows'
      />

      {errors[name] &&
        // @ts-ignore
        <div className="text-xs text-red-500">{errors?.[name]?.message}</div>
      }
    </div>
  )
}

export default InputWrapper
