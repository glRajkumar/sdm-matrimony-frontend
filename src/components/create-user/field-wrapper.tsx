import type { Control } from 'react-hook-form';
import type { Field } from './data';

import { SelectWrapper, InputWrapper, DatePickerWrapper, RadioWrapper } from '@/components/ui/form-wrapper';
import { SelectImageWrapper, SelectMultiImageWrapper } from './select-image-wrapper';
import { SelectListWrapper } from '../common/lists';
import { PasswordWrapper } from './password-wrapper';
import { SubCaste } from './sub-caste';

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

  if (type === "combobox" && "listName" in props) {
    return <SelectListWrapper control={control} {...props} />
  }

  if (type === "radio" && "options" in props) {
    return <RadioWrapper control={control} {...props} />
  }

  if (type === "password") {
    return <PasswordWrapper />
  }

  if (type === "subCaste") {
    return <SubCaste {...props} />
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