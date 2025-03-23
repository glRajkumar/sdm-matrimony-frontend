import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import {
  maritalStatus, raasi, ageRange, salaryRange,
  educationLevels, professions, languages, religions, castes
} from '@/utils';

import { useUserDetails } from '@/hooks/use-user';
import useUserStore from '@/store/user';

import { InputWrapper, ComboboxWrapper, SelectWrapper } from '@/components/ui/form-wrapper';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

interface props {
  hasFilters: boolean
  onSave: (filterData: any) => void
}

const schema = z.object({
  minQualification: z.string().optional(),
  profession: z.string().optional(),

  salaryRange: z.string().optional(),
  minSalary: z.coerce.number().optional().or(z.string()),

  ageRange: z.string().optional(),
  minAge: z.coerce.number().optional().or(z.string()),
  maxAge: z.coerce.number().optional().or(z.string()),

  maritalStatus: z.string().optional(),
  motherTongue: z.string().optional(),
  religion: z.string().optional(),
  caste: z.string().optional(),
  lagna: z.string().optional(),
  rasi: z.string().optional(),
})

const defaultValues: z.infer<typeof schema> = {
  minQualification: '',
  profession: '',

  salaryRange: '',
  minSalary: '',

  ageRange: '',
  minAge: '',
  maxAge: '',

  maritalStatus: '',
  motherTongue: '',
  religion: '',
  caste: '',
  lagna: '',
  rasi: '',
}

type listProps = {
  name: keyof z.infer<typeof schema>
  label: string
  options: optionsT
  type?: 'select'
}

const list: listProps[] = [
  {
    name: 'minQualification',
    label: 'Min Qualification',
    options: educationLevels
  },
  {
    name: 'profession',
    label: 'Profession',
    options: professions
  },
  {
    name: 'maritalStatus',
    label: 'Marital Status',
    options: maritalStatus,
    type: 'select'
  },
  {
    name: 'motherTongue',
    label: 'Mother Tongue',
    options: languages
  },
  {
    name: 'religion',
    label: 'Religion',
    options: religions
  },
  {
    name: 'caste',
    label: 'Caste',
    options: castes
  },
  {
    name: 'lagna',
    label: 'Lagna',
    options: raasi
  },
  {
    name: 'rasi',
    label: 'Rasi',
    options: raasi
  }
]

function Filters({ onSave, hasFilters }: props) {
  const userId = useUserStore(s => s?._id)
  const { data: user, isLoading } = useUserDetails(userId)

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues },
  })

  function onReset() {
    form.reset({ ...defaultValues })
    onSave({})
  }

  function onApply() {
    const pyload = {
      minQualification: user?.proffessionalDetails?.highestQualification,
      profession: user?.proffessionalDetails?.profession,

      salaryRange: "",
      minSalary: user?.proffessionalDetails?.salary,

      ageRange: "",
      minAge: user?.partnerPreferences?.minAge,
      maxAge: user?.partnerPreferences?.maxAge,

      maritalStatus: user?.partnerPreferences?.maritalStatus,
      motherTongue: user?.otherDetails?.motherTongue,
      religion: user?.otherDetails?.religion,
      caste: user?.otherDetails?.caste,
      lagna: user?.vedicHoroscope?.lagna,
      rasi: user?.vedicHoroscope?.rasi,
    }

    form.reset(pyload)
    onSave(pyload)
  }

  function onSubmit(data: z.infer<typeof schema>) {
    const filtered = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => Boolean(value))
    ) as Partial<typeof data>

    onSave(filtered)
  }

  return (
    <div className="p-6 border-r relative">
      <div className='sticky top-20'>
        <div className='df justify-between mb-2'>
          <h5 className='text-sm font-medium'>
            Filters{" "}
            {
              hasFilters && <span className='text-xs font-normal'>
                (Applied)
              </span>
            }
          </h5>

          {
            hasFilters &&
            <Button
              size="sm"
              variant="secondary"
              className='h-6 text-xs font-normal hover:bg-input'
              onClick={onReset}
            >
              Reset
            </Button>
          }
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="dfc max-h-[calc(100vh-10rem)]"
          >
            <div className="scroll-y -mx-6 px-6 py-4 space-y-4 border-y">
              <SelectWrapper
                name="salaryRange"
                label="Salary Range"
                control={form.control}
                options={salaryRange}
              />

              <div className='mb-0 -mt-1 text-xs text-center'>Or</div>

              <InputWrapper
                name="minSalary"
                label="Min Salary"
                control={form.control}
                className='mb-8'
              />

              <SelectWrapper
                name="ageRange"
                label="Age Range"
                control={form.control}
                options={ageRange}
              />

              <div className='mb-2 -mt-1 text-xs text-center'>Or</div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <InputWrapper
                  name="minAge"
                  label="Min Age"
                  control={form.control}
                />

                <InputWrapper
                  name="maxAge"
                  label="Max Age"
                  control={form.control}
                />
              </div>

              {
                list.map((item) => (
                  item.type === 'select' ? (
                    <SelectWrapper
                      {...item}
                      key={item.name}
                      control={form.control}
                    />
                  ) : (
                    <ComboboxWrapper
                      {...item}
                      key={item.name}
                      control={form.control}
                    />
                  )
                ))
              }
            </div>

            <div className="df mt-2">
              {
                !isLoading &&
                <Button
                  type="button"
                  variant="link"
                  className='p-0 font-normal'
                  onClick={onApply}
                >
                  Apply Your Preferences
                </Button>
              }

              <Button
                type="submit"
                className='ml-auto'
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default Filters
