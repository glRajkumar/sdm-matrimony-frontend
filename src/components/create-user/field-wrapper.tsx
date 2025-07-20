import type { Control } from 'react-hook-form';
import type { Field } from './data';

import { ComboboxWrapper, SelectWrapper, InputWrapper, DatePickerWrapper, RadioWrapper } from '@/components/ui/form-wrapper';
import { SelectImageWrapper, SelectMultiImageWrapper } from './select-image-wrapper';
import { PasswordWrapper } from './password-wrapper';

type FieldWrapperProps = Field & {
  control: Control<any>
}

function FieldWrapper({ control, type, ...props }: FieldWrapperProps) {
  if (type === "date") {
    return <DatePickerWrapper control={control} {...props} />
  }

  if (type === "file" && "multiple" in props) {
    return <SelectMultiImageWrapper {...props} />
  }

  if (type === "file") {
    return <SelectImageWrapper {...props} />
  }

  if (type === "select" && "options" in props) {
    return <SelectWrapper control={control} {...props} />
  }

  if (type === "combobox" && "options" in props) {
    return <ComboboxWrapper control={control} {...props} />
  }

  if (type === "radio" && "options" in props) {
    return <RadioWrapper control={control} {...props} />
  }

  if (type === "password") {
    return <PasswordWrapper />
  }

  return (
    <InputWrapper
      control={control}
      type={type}
      {...props}
      defaultValue={undefined}
    />
  )
}

export default FieldWrapper