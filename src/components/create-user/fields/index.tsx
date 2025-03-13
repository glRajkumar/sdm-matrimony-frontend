
import type { fields } from '../data';

import SelectImageWrapper from './select-image-wrapper';
import SelectDateWrapper from './select-date-wrapper';
import SelectWrapper from './select-wrapper';
import InputWrapper from './input-wrapper';

type props = {
  fields: fields[]
}

function Fields({ fields }: props) {
  return fields.map(field => {
    if (field.type === "select") {
      return <SelectWrapper key={field.name} {...field} />
    }

    if (field?.name === "dob") {
      return <SelectDateWrapper key={field.name} field={field} />
    }

    if (field?.type === "file") {
      return <SelectImageWrapper key={field.name} {...field} />
    }

    return <InputWrapper key={field.name} {...field} />
  })
}

export default Fields