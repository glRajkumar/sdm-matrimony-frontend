import { FormProvider, type UseFormReturn } from "react-hook-form";

import { type findUserSchemaT } from "@/hooks/use-user-filters";
import { gender, maritalStatus } from '@/utils/enums';
import { useStatics } from "@/hooks/use-general";
import { cn } from "@/lib/utils";

import { InputWrapper, MultiSelectComboboxWrapper } from "@/components/ui/form-wrapper";
import { Button } from "@/components/ui/button";

type props = {
  methods: UseFormReturn<findUserSchemaT>
  children?: React.ReactNode
  className?: string
  onSubmit: (v: findUserSchemaT) => void
}

function UsersFiltersRow({ methods, children, className, onSubmit }: props) {
  const { data: castes, isLoading: isCasteLoading } = useStatics("castes")

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn("df flex-wrap", className)}
      >
        <InputWrapper
          name="fullName"
          control={methods.control}
          placeholder="Enter Full Name"
        />

        <MultiSelectComboboxWrapper
          name="gender"
          label="Gender"
          options={gender}
          control={methods.control}
          className="min-w-28"
          inlineLable
        />

        <MultiSelectComboboxWrapper
          name="maritalStatus"
          label="Marital Status"
          options={maritalStatus}
          control={methods.control}
          className="min-w-40"
          inlineLable
        />

        <MultiSelectComboboxWrapper
          name="caste"
          label="Caste"
          options={castes}
          control={methods.control}
          isLoading={isCasteLoading}
          className="min-w-56"
          inlineLable
        />

        {children}

        {
          methods.formState.isDirty &&
          <Button
            type="button"
            variant="outline"
            onClick={() => methods.reset()}
            className="font-normal"
          >
            Reset
          </Button>
        }

        <Button
          type="submit"
          className=" bg-pink-500 hover:bg-pink-400"
        >
          Search
        </Button>
      </form>
    </FormProvider>
  )
}

export default UsersFiltersRow
