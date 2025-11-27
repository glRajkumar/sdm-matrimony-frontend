import type { Control } from 'react-hook-form';
import type { Field } from './data';

import { SelectWrapper, InputWrapper, DatePickerWrapper, RadioWrapper } from '@/components/ui/form-wrapper';
import { SelectImageWrapper, SelectMultiImageWrapper } from './select-image-wrapper';
import { SelectListWrapper } from '../common/lists';
import { PasswordWrapper } from './password-wrapper';
import { SubCaste } from './sub-caste';

type FieldWrapperProps = Field & {
  control: Control<any>
  onBlur: (n: string, v: string) => void
}

function FieldWrapper({ control, onBlur, type, isRequired, ...props }: FieldWrapperProps) {
  if (type === "date") {
    return <DatePickerWrapper control={control} {...props} className={isRequired ? "" : 'hidden'} />
  }

  if (type === "file" && "multiple" in props) {
    return <SelectMultiImageWrapper {...props} className={isRequired ? "ca-images" : 'hidden'} />
  }

  if (type === "file") {
    return <SelectImageWrapper {...props} className={isRequired ? "ca-profile" : 'hidden'} />
  }

  if (type === "select" && "options" in props) {
    return <SelectWrapper control={control} {...props} className={isRequired ? "" : 'hidden'} />
  }

  if (type === "combobox" && "listName" in props) {
    return <SelectListWrapper control={control} {...props} className={isRequired ? "" : 'hidden'} />
  }

  if (type === "radio" && "options" in props) {
    return <RadioWrapper control={control} {...props} className={isRequired ? "" : 'hidden'} />
  }

  if (type === "password") {
    return <PasswordWrapper className={isRequired ? "" : 'hidden'} />
  }

  if (type === "subCaste") {
    return <SubCaste {...props} className={isRequired ? "" : 'hidden'} />
  }

  return (
    <InputWrapper
      control={control}
      type={type}
      {...props}
      defaultValue={undefined}
      {...((props.name === "email" || props.name === "contactDetails.mobile") && {
        onBlur(e) {
          onBlur(props.name, e.target.value)
        }
      })}
      className={isRequired ? "" : 'hidden'}
    />
  )
}

export default FieldWrapper