
import type { fields } from '../data';

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

    return <InputWrapper key={field.name} {...field} />
  })
}

export default Fields