"use client";

import { Controller, useForm } from 'react-hook-form';
import { initialData, fieldList } from './data';
import SelectWrapper from '../ui/select';
import Link from 'next/link';

function Signup() {
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isSubmitting }
  } = useForm({
    defaultValues: initialData
  });

  const onSubmit = async (data: any) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
              );
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
                {["fullName", "email", "password"].includes(field.name)
                  ? <label className='text-red-500 ml-2 '>*</label>
                  : <></>
                }

                <input
                  id={`signup-${field.name}`}
                  type={field.type}
                  {...register(field.name, {
                    required: ["fullName", "email", "password"].includes(field.name)
                      ? `${field.name} is required`
                      : false
                  })}
                />
                {errors[field.name] && (
                  <div className="text-red-500">{errors[field.name]?.message}</div>
                )}
              </div>
            );
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
  );
}

export default Signup;
