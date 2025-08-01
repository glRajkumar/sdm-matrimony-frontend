import { useState } from "react";
import { useFormContext, Validate, FieldValues } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type props = {
  name: string
  label: string
  validate?: Validate<any, FieldValues> | Record<string, Validate<any, FieldValues>> | undefined
}

function PasswordField({ name, label, validate }: props) {
  const [showPassword, setShowPassword] = useState(true)
  const { register, formState: { errors } } = useFormContext()

  return (
    <div className="space-y-2">
      <Label htmlFor={name} className="block mb-2">{label} Password</Label>

      <div className="relative">
        <Input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={`Enter ${label} password`}
          {...register(name, {
            required: `${label} password is required`,
            minLength: {
              value: 6,
              message: `${label} password must be at least 6 characters long`,
            },
            validate,
          })}
        />

        <Button
          size="icon"
          type="button"
          variant="ghost"
          className="absolute right-2 top-1/2 -translate-y-1/2 h-7 w-7"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </Button>
      </div>

      {errors[name] && (
        <div className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </div>
      )}
    </div>
  )
}

export default PasswordField
