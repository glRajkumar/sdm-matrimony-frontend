import { useMemo, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { filterObj } from "@/utils";

const strOrStrArrSchema = z.union([z.string(), z.array(z.string())]).optional()

export const findUsersSchema = z.object({
  fullName: z.string().optional(),
  minAge: z.coerce.number().optional(),
  maxAge: z.coerce.number().optional(),
  createdBy: z.string().optional(),
  isBlocked: z.coerce.boolean().optional(),
  isDeleted: z.coerce.boolean().optional(),
  isMarried: z.coerce.boolean().optional(),
  minSalary: z.coerce.number().optional(),
  ageRange: z.string().optional(),
  salaryRange: z.string().optional(),
  rasi: strOrStrArrSchema,
  lagna: strOrStrArrSchema,
  caste: strOrStrArrSchema,
  subCaste: strOrStrArrSchema,
  gender: strOrStrArrSchema,
  sector: strOrStrArrSchema,
  religion: strOrStrArrSchema,
  profession: strOrStrArrSchema,
  motherTongue: strOrStrArrSchema,
  maritalStatus: strOrStrArrSchema,
  approvalStatus: strOrStrArrSchema,
  minQualification: strOrStrArrSchema,
})

export type findUserSchemaT = z.infer<typeof findUsersSchema>

export function useUserFilters(defaultValues: findUserSchemaT = {}) {
  const [payload, setPaload] = useState({ ...defaultValues })

  const methods = useForm({
    resolver: zodResolver(findUsersSchema) as any,
    defaultValues: { ...defaultValues },
  })

  const final = useMemo(() => {
    const filtered: Record<string, unknown> = {}
    for (const key of Object.keys(payload) as (keyof findUserSchemaT)[]) {
      const value = payload[key]
      filtered[key] = Array.isArray(value) ? value.join(',') : value
    }

    return filterObj(filtered) || {}
  }, [payload])

  function onReset() {
    setPaload({ ...defaultValues })
    methods.reset({ ...defaultValues })
  }

  function onSubmit(data: findUserSchemaT) {
    setPaload({ ...data })
    methods.reset({ ...methods.getValues() })
  }

  return {
    final,
    methods,
    onReset,
    onSubmit,
  }
}
