import { z } from "zod";

export const personalDetailsSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  gender: z.string().nonempty("Gender is required"),
  dob: z.date(),
  maritalStatus: z.string().nonempty("Marital Status is required"),
})

export const contactDetailsSchema = z.object({
  mobile: z.string().optional().or(z.literal("")),
  address: z.string().min(5, "Address must be at least 5 characters").optional().or(z.literal("")),
})

export const professionalDetailsSchema = z.object({
  highestQualification: z.string().nonempty("Highest Qualification is required"),
  qualifications: z.string().nonempty("Qualifications is required"),
  companyName: z.string().optional(),
  profession: z.string().nonempty("Profession is required"),
  sector: z.string().nonempty("Sector is required"),
  salary: z.coerce.number(),
})
  .refine(
    (data) =>
      !(data.profession === "Unemployed" && data.sector === "Unemployed") ||
      data.salary === 0,
    {
      path: ["salary"],
      message: "Salary must be 0 when unemployed",
    }
  )
  .refine(
    (data) =>
      data.profession === "Unemployed" && data.sector === "Unemployed"
        ? true
        : data.salary >= 10000,
    {
      path: ["salary"],
      message: "Salary must be at least 10000",
    }
  )
  .refine(
    (data) =>
      data.sector === "Unemployed" || data.profession !== "Unemployed",
    {
      path: ["profession"],
      message: "Profession cannot be Unemployed if sector is not Unemployed",
    }
  )
  .refine(
    (data) =>
      data.profession === "Unemployed" && data.sector === "Unemployed"
        ? true :
        !!data.companyName?.trim(),
    {
      path: ["companyName"],
      message: "Company Name is required"
    }
  )

export const familyDetailsSchema = z.object({
  fatherName: z.string().min(2, "Father's name must be at least 2 characters"),
  motherName: z.string().min(2, "Mother's name must be at least 2 characters"),
  noOfBrothers: z.coerce.number().min(0, "Cannot be negative").default(0),
  noOfSisters: z.coerce.number().min(0, "Cannot be negative").default(0),
  birthOrder: z.coerce.number().min(1, "Birth order must be at least 1").default(1),
  isFatherAlive: z.boolean(),
  isMotherAlive: z.boolean(),
})

export const vedicHoroscopeSchema = z.object({
  rasi: z.string().optional().or(z.literal("")),
  lagna: z.string().optional().or(z.literal("")),
  nakshatra: z.string().optional().or(z.literal("")),
  dashaPeriod: z.string().optional().or(z.literal("")),
  placeOfBirth: z.string().optional().or(z.literal("")),
  timeOfBirth: z.string().optional().or(z.literal("")),
  vedicHoroscopePic: z.optional(z.union([z.string(), z.instanceof(File)])),
})

export const otherDetailsSchema = z.object({
  motherTongue: z.string().optional().or(z.literal("")),
  houseType: z.string().optional().or(z.literal("")),
  religion: z.string().optional().or(z.literal("")),
  height: z.string().optional().or(z.literal("")),
  color: z.string().optional().or(z.literal("")),
  caste: z.string().optional().or(z.literal("")),
})

export const partnerPreferencesSchema = z.object({
  minAge: z.coerce.number().min(18, "Minimum age must be at least 18").optional().or(z.literal("")),
  maxAge: z.coerce.number().min(18, "Maximum age must be at least 18").optional().or(z.literal("")),
  minQualification: z.string().optional().or(z.literal("")),
  sector: z.string().optional().or(z.literal("")),
  profession: z.string().optional().or(z.literal("")),
  minSalary: z.coerce.number().optional().or(z.literal("")),
  religion: z.string().optional().or(z.literal("")),
  caste: z.string().optional().or(z.literal("")),
  motherTongue: z.string().optional().or(z.literal("")),
  location: z.string().optional().or(z.literal("")),
  expectation: z.string().optional().or(z.literal("")),
  maritalStatus: z.string().optional().or(z.literal("")),
}).refine(
  (data) =>
    (typeof data.minAge === "number" && typeof data.maxAge === "number")
      ? data.minAge < data.maxAge
      : true,
  {
    message: "Minimum age must be less than maximum age",
    path: ["minAge"],
  }
).refine(
  (data) =>
    (typeof data.minAge === "number" && typeof data.maxAge === "number")
      ? data.minAge !== data.maxAge
      : true,
  {
    message: "Minimum age and maximum age should not be equal",
    path: ["minAge"],
  }
)

export const createUserSchema = z.object({
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  password: z.string().min(8, "Password must be at least 8 characters"),
  profileImg: z.optional(z.union([z.string(), z.instanceof(File)])),
  images: z.array(z.union([z.string(), z.instanceof(File)])).optional(),
  ...personalDetailsSchema.shape,
  contactDetails: contactDetailsSchema,
  proffessionalDetails: professionalDetailsSchema,
  familyDetails: familyDetailsSchema,
  vedicHoroscope: vedicHoroscopeSchema,
  otherDetails: otherDetailsSchema,
  partnerPreferences: partnerPreferencesSchema,
})

export type userInputT = z.infer<typeof createUserSchema>
export type personalDetailsT = z.infer<typeof personalDetailsSchema>
export type contactDetailsT = z.infer<typeof contactDetailsSchema>
export type professionalDetailsT = z.infer<typeof professionalDetailsSchema>
export type familyDetailsT = z.infer<typeof familyDetailsSchema>
export type vedicHoroscopeT = z.infer<typeof vedicHoroscopeSchema>
export type otherDetailsT = z.infer<typeof otherDetailsSchema>
export type partnerPreferencesT = z.infer<typeof partnerPreferencesSchema>
