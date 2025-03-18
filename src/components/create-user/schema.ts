import { z } from "zod";

export const createUserSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  profileImg: z.any().optional(),
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  gender: z.string().min(1, "Gender is required"),
  dob: z.date(),
  maritalStatus: z.string().min(1, "Marital Status is required"),

  contactDetails: z.object({
    mobile: z.string().optional(),
    address: z.string().optional(),
  }),

  proffessionalDetails: z.object({
    qualification: z.string().min(2, "Qualification must be at least 2 characters"),
    work: z.string().min(2, "Work must be at least 2 characters"),
    salary: z.number().min(0, "Salary cannot be negative"),
  }),

  familyDetails: z.object({
    fatherName: z.string().min(2, "Father's name must be at least 2 characters"),
    motherName: z.string().min(2, "Mother's name must be at least 2 characters"),
    noOfBrothers: z.number().min(0).default(0),
    noOfSisters: z.number().min(0).default(0),
    birthOrder: z.number().min(1).default(1),
  }),

  vedicHoroscope: z.object({
    nakshatra: z.string().optional(),
    rasi: z.string().optional(),
    lagna: z.string().optional(),
    dashaPeriod: z.string().optional(),
    placeOfBirth: z.string().optional(),
    timeOfBirth: z.string().optional(),
  }),

  otherDetails: z.object({
    height: z.number().optional(),
    color: z.string().optional(),
    houseType: z.string().optional(),
    motherTongue: z.string().optional(),
    religion: z.string().optional(),
    caste: z.string().optional(),
  }),

  partnerPreferences: z.object({
    minAge: z.number().optional(),
    maxAge: z.number().optional(),
    qualification: z.string().optional(),
    work: z.string().optional(),
    salary: z.number().optional(),
    religion: z.string().optional(),
    caste: z.string().optional(),
    motherTongue: z.string().optional(),
    location: z.string().optional(),
    expectation: z.string().optional(),
    maritalStatus: z.string().optional(),
  }),
})

export type CreateUserInput = z.infer<typeof createUserSchema> 