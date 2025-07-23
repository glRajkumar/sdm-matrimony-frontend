import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { usePathname } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PasswordWrapper() {
  const [showPassword, setShowPassword] = useState(true)
  const { control, getValues, setValue, clearErrors } = useFormContext()

  const pathname = usePathname()
  const isAdmin = pathname.includes("admin")

  function autoGeneratePassword() {
    const { fullName, dob } = getValues()

    if (!fullName) return toast("Please fill in Full Name.")
    if (!dob) return toast("Please fill in Date of Birth.")

    const password = `${fullName.replace(/\s/g, "").slice(0, 4)}_${format(new Date(dob), "ddMMyy")}`
    setValue("password", password)
    clearErrors("password")
  }

  return (
    <FormField
      name="password"
      control={control}
      render={({ field }) => (
        <FormItem>
          <div className="df justify-between">
            <FormLabel>Password</FormLabel>
            {isAdmin && (
              <Button
                size="sm"
                type="button"
                variant="secondary"
                className="h-auto p-0 text-xs bg-transparent font-normal hover:underline hover:bg-transparent shadow-none"
                onClick={autoGeneratePassword}
              >
                Auto Generate
              </Button>
            )}
          </div>

          <div className="relative">
            <FormControl>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                {...field}
              />
            </FormControl>

            <Button
              size="sm"
              type="button"
              variant="secondary"
              className="size-8 p-0 absolute right-0.5 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 border"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword
                ? <Eye className="h-4 w-4" />
                : <EyeOff className="h-4 w-4" />
              }
            </Button>
          </div>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
