'use client'

import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CardContent, Card } from "@/components/ui/card"
import { HeartIcon, ChevronRightIcon, ChevronLeftIcon } from 'lucide-react'
import Link from 'next/link'
import { RegisterOptions } from "react-hook-form";

type base = {
  name: string;
  label?: string;
  rules?: RegisterOptions;
  required?: boolean;
};

type BaseField = base & {
  type: "text" | "number" | "email" | "password" | "date";
};

type SelectField = base & {
  type: "select";
  options: { label: string; value: string }[];
};

type fields = BaseField | SelectField;

export const fieldList: fields[] = [
  {
    name: "fullName",
    type: "text",
    label: "Full Name",
    required: true,
    rules: { required: "Full Name is required" },
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    required: true,
    rules: {
      required: "Email is required",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "Invalid email address"
      }
    },
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    required: true,
    rules: {
      required: "Password is required",
      minLength: {
        value: 8,
        message: "Password must be at least 8 characters"
      }
    },
  },
  {
    name: "gender",
    type: "select",
    label: "Gender",
    required: true,
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Other", value: "other" }
    ],
    rules: { required: "Gender is required" },
  },
  {
    name: "dob",
    type: "date",
    label: "Date of Birth",
    required: true,
    rules: { required: "Date of Birth is required" },
  },
  {
    name: "fatherName",
    type: "text",
    label: "Father's Name",
    required: true,
    rules: { required: "Father's Name is required" },
  },
  {
    name: "motherName",
    type: "text",
    label: "Mother's Name",
    required: true,
    rules: { required: "Mother's Name is required" },
  },
  // Optional fields
  {
    name: "qualification",
    type: "text",
    label: "Qualification",
  },
  {
    name: "work",
    type: "text",
    label: "Work",
  },
  {
    name: "salary",
    type: "number",
    label: "Salary per Month (in ₹)",
  },
  {
    name: "noOfBrothers",
    type: "number",
    label: "Number of Brothers",
  },
  {
    name: "noOfSisters",
    type: "number",
    label: "Number of Sisters",
  },
  {
    name: "birthOrder",
    type: "number",
    label: "Birth Order",
  },
  {
    name: "placeOfBirth",
    type: "text",
    label: "Place of Birth",
  },
  {
    name: "nakshatra",
    type: "text",
    label: "Nakshatra",
  },
  {
    name: "rasi",
    type: "text",
    label: "Rasi",
  },
  {
    name: "lagna",
    type: "text",
    label: "Lagna",
  },
  {
    name: "expectation",
    type: "text",
    label: "Expectation",
  },
  {
    name: "formalities",
    type: "text",
    label: "Formalities",
  },
  {
    name: "houseType",
    type: "text",
    label: "House Type",
  },
  {
    name: "address",
    type: "text",
    label: "Address",
  },
  {
    name: "dashaPeriod",
    type: "text",
    label: "Dasha Period",
  },
  {
    name: "height",
    type: "number",
    label: "Height (in cm)",
  },
  {
    name: "color",
    type: "text",
    label: "Skin Color",
  },
];

export const requiredFields = fieldList.filter(field => field.required);
export const optionalFields = fieldList.filter(field => !field.required);

type InitialFields = {
  [K in (typeof fieldList)[number]["name"]]: string | number;
};

export const initialData: InitialFields = fieldList.reduce((prev, curr) => {
  prev[curr.name as keyof InitialFields] = curr.type === "number" ? 0 : "";
  return prev;
}, {} as InitialFields);


type FormValues = typeof initialData

const steps = [
  { title: 'Basic Info', fields: ['fullName', 'email', 'password', 'gender', 'dob'] },
  { title: 'Family Info', fields: ['fatherName', 'motherName'] },
  { title: 'Additional Info', fields: optionalFields.map((field: any) => field.name) }
]

export default function SignupPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormValues>({
    defaultValues: initialData
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setIsSubmitting(true)
    // Here you would typically send the data to your backend
    console.log(data)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    alert('Form submitted successfully!')
  }

  const renderField = (fieldName: string) => {
    const field = fieldList.find((f: any) => f.name === fieldName)
    if (!field) return null

    return (
      <div key={field.name} className="space-y-2">
        <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
          {field.label || field.name}
          {field?.required && <span className="text-red-500">*</span>}
        </label>
        {field.type === 'select' ? (
          <Select onValueChange={(value) => setValue(field.name, value)}>
            <SelectTrigger>
              <SelectValue placeholder={`Select ${field.label || field.name}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            id={field.name}
            type={field.type}
            {...register(field.name, field.rules)}
            className={errors[field.name] ? 'border-red-500' : ''}
          />
        )}
        {errors[field.name] && (
          <p className="text-red-500 text-xs mt-1">{errors[field.name]?.message}</p>
        )}
      </div>
    )
  }

  const currentFields = steps[currentStep].fields

  return (
    <div className="min-h-screen py-8 flex items-center justify-center bg-linear-to-r from-pink-100 to-purple-100">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-8">
          <div className="flex flex-col items-center space-y-2 mb-6">
            <HeartIcon className="h-12 w-12 text-pink-500" />
            <h1 className="text-3xl font-bold text-gray-800">Create Your Account</h1>
            <p className="text-gray-600">Find your perfect match</p>
          </div>
          <div className="mb-8">
            <div className="flex justify-between">
              {steps.map((step, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-pink-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                    {index + 1}
                  </div>
                  <span className="text-xs mt-1">{step.title}</span>
                </div>
              ))}
            </div>
            <div className="mt-2 h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-pink-500 rounded-full transition-all duration-300 ease-in-out"
                style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentFields.map(renderField)}
            </div>
            <div className="flex justify-between mt-8">
              {currentStep > 0 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="flex items-center"
                >
                  <ChevronLeftIcon className="mr-2 h-4 w-4" /> Previous
                </Button>
              )}
              {currentStep < steps.length - 1 ? (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="ml-auto flex items-center"
                >
                  Next <ChevronRightIcon className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button className="ml-auto bg-pink-500 hover:bg-pink-600" type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                </Button>
              )}
            </div>
          </form>
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-pink-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

