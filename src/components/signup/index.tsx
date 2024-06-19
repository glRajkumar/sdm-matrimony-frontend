"use client";

import { Controller, useForm } from 'react-hook-form';
import { initialData, fieldList } from './data';
import SelectWrapper from '../ui/select';

function Signup() {
  const { control, register, } = useForm({
    defaultValues: initialData
  })

  return (
    <div className='dc p-4 h-screen overflow-hidden'>
      <form className='w-full max-w-4xl p-8 max-h-[90vh] overflow-y-auto bg-gray-200 rounded-2xl'>
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

                <input
                  id={`signup-${field.name}`}
                  type={field.type}
                  {...register(field.name)}
                />
              </div>
            )
          })
        }
      </form>
    </div>
  )
}

export default Signup
