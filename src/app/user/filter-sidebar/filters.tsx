import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { maritalStatus, ageRange, salaryRange } from '@/utils';
import { usePartnerPreferences } from '@/hooks/use-user';
import useUserStore from '@/store/user';

import { InputWrapper, SelectWrapper } from '@/components/ui/form-wrapper';
import { SelectListWrapper } from '@/components/common/lists';
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

interface props {
  hasFilters: boolean
  onSave: (filterData: any) => void
}

const schema = z.object({
  minQualification: z.string().optional(),
  profession: z.string().optional(),
  sector: z.string().optional(),

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
  sector: '',

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
  listName: staticsNameT
}

const list: listProps[] = [
  {
    name: 'minQualification',
    label: 'Min Qualification',
    listName: "educationLevels",
  },
  {
    name: 'sector',
    label: 'Sector',
    listName: "sectors",
  },
  {
    name: 'profession',
    label: 'Profession',
    listName: "professions",
  },
  {
    name: 'motherTongue',
    label: 'Mother Tongue',
    listName: "languages",
  },
  {
    name: 'religion',
    label: 'Religion',
    listName: "religions",
  },
  {
    name: 'caste',
    label: 'Caste',
    listName: "castes",
  },
  {
    name: 'lagna',
    label: 'Lagna',
    listName: "raasi",
  },
  {
    name: 'rasi',
    label: 'Rasi',
    listName: "raasi",
  }
]

function getPayload(userPartnerPreferences: Pick<userT, "partnerPreferences">) {
  const payload: any = {
    ...userPartnerPreferences,
    salaryRange: "",
    ageRange: "",
    lagna: "",
    rasi: "",
  }

  Object.entries(payload).forEach(([key, value]) => {
    if (!value) {
      payload[key] = ""
    }
  })

  return payload
}

function Filters({ onSave, hasFilters }: props) {
  const userId = useUserStore(s => s?._id)
  const { data: user, isLoading } = usePartnerPreferences(userId)

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { ...defaultValues },
  })

  useEffect(() => {
    if (user) {
      const payload: any = getPayload(user)
      form.reset(payload)
      onSave(payload)
    }
  }, [user])

  function onReset() {
    form.reset({ ...defaultValues })
    onSave({})
  }

  function onApply() {
    if (!user) return
    const payload: any = getPayload(user)
    form.reset(payload)
    onSave(payload)
  }

  function onSubmit(data: z.infer<typeof schema>) {
    const filtered = Object.fromEntries(
      Object.entries(data)
        .filter(([_, value]) => Boolean(value) && value !== "Any")
        .map(([key, value]) => [key, `${value}`?.split(" (")?.[0]])
    ) as Partial<typeof data>

    onSave(filtered)
  }

  return (
    <>
      <div className='df md:justify-between md:mb-4'>
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
          <div className="scroll-y -mx-4 md:-mx-6 px-4 md:px-6 py-4 space-y-4 border-y">
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

            <SelectWrapper
              name="maritalStatus"
              label="Marital Status"
              control={form.control}
              options={maritalStatus}
            />

            {
              list.map((item) => (
                <SelectListWrapper
                  {...item}
                  key={item.name}
                  control={form.control}
                  additionalOpts="Any"
                  canCreateNew
                />
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
    </>
  )
}

export default Filters
