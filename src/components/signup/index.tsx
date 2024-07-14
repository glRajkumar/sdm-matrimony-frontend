"use client";

import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

import { initialData, fieldList } from './data';
import { signupUser } from '@/actions';

import { DatePicker } from '../common/date-picker';
import SelectWrapper from '../ui/select';

function Signup() {
  const [selectedDate, setSelectedDate] = useState("")
  const {
    control, handleSubmit, register,
    formState: { errors, isSubmitting }
  } = useForm({ defaultValues: initialData })

  const router = useRouter()

  const { mutate } = useMutation({
    mutationFn: signupUser,
    onSuccess: (data) => {
      console.log("Register success:", data?.msg)
      router.push('/signin')
    },
  })

  const onSubmit = (data: any) => {
    let payload = {
      ...data,
      dob: selectedDate
    }
    mutate(payload)
  }

  return (
    <div className='dc p-4 h-screen overflow-hidden'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='w-1/2 max-w-2xl p-8 max-h-[90vh] overflow-y-auto rounded-2xl shadow-lg bg-gray-100'
      >
        <h1 className="text-[18px] sm:text-xl text-[#4F6F52] font-bold pb-5">
          SignUp
        </h1>

        {
          fieldList.map(field => {
            if (field.type === "select") {
              return (
                <div key={field.name}>
                  <label
                    htmlFor={`signup-${field.name}`}
                    className='capitalize'
                  >
                    {field?.label || field?.name}
                  </label>

                  <Controller
                    name={field.name}
                    control={control}
                    render={({ field: { value, onChange } }) => (
                      <SelectWrapper
                        value={value}
                        items={field.options}
                        onChange={onChange}
                        placeholder=''
                      />
                    )}
                  />
                </div>
              )
            }

            if (field?.name === "dob") {
              return (
                <div>
                  <label htmlFor="dob">Date of Birth</label>
                  <DatePicker onDateSelect={(date: string) => setSelectedDate(date)} />
                </div>
              )
            }

            return (
              <div
                key={field.name}
                className='mb-4'
              >
                <label
                  htmlFor={`signup-${field.name}`}
                  className='capitalize'
                >
                  {field?.label || field?.name}
                </label>
                {["fullName", "email", "password", "dob"].includes(field.name)
                  ? <label className='text-red-500 ml-2 '>*</label>
                  : <></>
                }

                <input
                  id={`signup-${field.name}`}
                  type={field.type}
                  {...register(field.name, {
                    required: ["fullName", "email", "password", "dob"].includes(field.name)
                      ? `${field.name} is required`
                      : false
                  })}
                />
                {errors[field.name] && (
                  <div className="text-red-500">{errors[field.name]?.message}</div>
                )}
              </div>
            )
          })
        }

        <div className="my-2 flex justify-center items-center">
          <button className="bg-[#4F6F52] w-32 text-white py-1 px-4 text-[13px] sm:text-[15px]">
            {isSubmitting ? "Loading..." : "SignUp"}
          </button>
        </div>

        <div className="grid grid-cols-3 items-center text-gray-400">
          <hr className="border-gray-400" />
          <p className="text-center">or</p>
          <hr className="border-gray-400" />
        </div>

        <div className="flex flex-col items-center">
          <p className="text-[#4F6F52] text-[14px] sm:text-[16px]">
            Already have an account ?{" "}
          </p>
          <p className="text-blue-400">
            <Link href={"/signin"}>SignIn</Link>
          </p>
        </div>
      </form>
    </div>
  )
}

export default Signup
