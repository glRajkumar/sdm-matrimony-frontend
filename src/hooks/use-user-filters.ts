import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";
import { z } from "zod";

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

export function useUserFilters(defaultValues: findUserSchemaT = {}): UseFormReturn<findUserSchemaT> {
  return useForm<findUserSchemaT>({
    resolver: zodResolver(findUsersSchema) as any,
    defaultValues,
  })
}

