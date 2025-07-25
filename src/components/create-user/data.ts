import { Path } from 'react-hook-form';

import type { userInputT } from '@/utils/user-schema';

import {
  gender, maritalStatus, languages, religions, castes,
  nakshatra, raasi, aliveOptions, educationLevels, professions,
  proffessionalSectors,
} from '@/utils';

type BaseField = {
  name: Path<userInputT>
  label: string
  defaultValue?: primitiveT
}

type TextField = BaseField & {
  type: "text" | "email" | "password" | "tel" | "time"
}

type FileField = BaseField & {
  type: "file"
  multiple?: boolean
  className?: string
}

type NumberField = BaseField & {
  type: "number"
  min?: number
  max?: number
  step?: number
}

type SelectField = BaseField & {
  type: "select" | "radio"
  options: optionsT
}

type ComboboxField = BaseField & {
  type: "combobox"
  options: optionsT
  canCreateNew?: boolean
}

type DateField = BaseField & {
  type: "date"
}

export type Field = TextField | NumberField | SelectField | DateField | FileField | ComboboxField

type FieldSection = {
  lable: string
  list: Field[]
}

export const fieldList: FieldSection[] = [
  {
    lable: "Account Details",
    list: [
      {
        name: "email",
        label: "Email",
        type: "email",
      },
      {
        name: "password",
        label: "Password",
        type: "password",
      }
    ]
  },
  {
    lable: "Personal Details",
    list: [
      {
        name: "profileImg",
        label: "Profile Image",
        type: "file",
      },
      {
        name: "images",
        label: "Additional Images",
        type: "file",
        multiple: true,
      },
      {
        name: "fullName",
        label: "Full Name",
        type: "text",
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        options: gender,
      },
      {
        name: "dob",
        label: "Date of Birth",
        type: "date",
      },
      {
        name: "maritalStatus",
        label: "Marital Status",
        type: "select",
        options: maritalStatus,
        defaultValue: "Single",
      }
    ]
  },
  {
    lable: "Contact Details",
    list: [
      {
        name: "contactDetails.mobile",
        label: "Mobile Number",
        type: "tel",
      },
      {
        name: "contactDetails.address",
        label: "Address",
        type: "text",
      }
    ]
  },
  {
    lable: "Professional Details",
    list: [
      {
        name: "proffessionalDetails.highestQualification",
        label: "Highest Qualification",
        type: "combobox",
        options: educationLevels,
      },
      {
        name: "proffessionalDetails.qualifications",
        label: "Qualifications",
        type: "text"
      },
      {
        name: "proffessionalDetails.sector",
        label: "Sector",
        type: "combobox",
        options: proffessionalSectors,
      },
      {
        name: "proffessionalDetails.profession",
        label: "Profession",
        type: "combobox",
        options: professions,
        canCreateNew: true,
      },
      {
        name: "proffessionalDetails.companyName",
        label: "Company Name",
        type: "text"
      },
      {
        name: "proffessionalDetails.salary",
        label: "Salary per Month (in ₹)",
        type: "number",
        defaultValue: 0,
        step: 1000,
        min: 0,
      }
    ]
  },
  {
    lable: "Family Details",
    list: [
      {
        name: "familyDetails.fatherName",
        label: "Father's Name",
        type: "text"
      },
      {
        name: "familyDetails.motherName",
        label: "Mother's Name",
        type: "text"
      },
      {
        name: "familyDetails.isFatherAlive",
        label: "",
        type: "radio",
        options: aliveOptions,
        defaultValue: true,
      },
      {
        name: "familyDetails.isMotherAlive",
        label: "",
        type: "radio",
        options: aliveOptions,
        defaultValue: true,
      },
      {
        name: "familyDetails.noOfBrothers",
        label: "Number of Brothers",
        type: "number",
        defaultValue: 0,
        step: 1,
        min: 0,
      },
      {
        name: "familyDetails.noOfSisters",
        label: "Number of Sisters",
        type: "number",
        defaultValue: 0,
        step: 1,
        min: 0,
      },
      {
        name: "familyDetails.birthOrder",
        label: "Birth Order",
        type: "number",
        defaultValue: 1,
        step: 1,
        min: 1,
      }
    ]
  },
  {
    lable: "Horoscope Details",
    list: [
      {
        name: "vedicHoroscope.nakshatra",
        label: "Nakshatra",
        type: "combobox",
        options: ["Don't wish to specify", ...nakshatra],
      },
      {
        name: "vedicHoroscope.rasi",
        label: "Rasi",
        type: "combobox",
        options: ["Don't wish to specify", ...raasi],
      },
      {
        name: "vedicHoroscope.lagna",
        label: "Lagna",
        type: "combobox",
        options: ["Don't wish to specify", ...raasi],
      },
      {
        name: "vedicHoroscope.dashaPeriod",
        label: "Dasha Period",
        type: "text"
      },
      {
        name: "vedicHoroscope.placeOfBirth",
        label: "Place of Birth",
        type: "text"
      },
      {
        name: "vedicHoroscope.timeOfBirth",
        label: "Time of Birth",
        type: "time"
      },
      {
        name: "vedicHoroscope.dosham",
        label: "Dosham",
        type: "text"
      },
      {
        name: "vedicHoroscope.vedicHoroscopePic",
        label: "Vedic Horoscope Picture",
        type: "file",
        // className: "md:col-span-2"
      },
    ]
  },
  {
    lable: "Other Details",
    list: [
      {
        name: "otherDetails.height",
        label: "Height (in cm)",
        type: "number"
      },
      {
        name: "otherDetails.color",
        label: "Color",
        type: "text"
      },
      {
        name: "otherDetails.houseType",
        label: "House Type",
        type: "text"
      },
      {
        name: "otherDetails.motherTongue",
        label: "Mother Tongue",
        type: "combobox",
        options: ["Don't wish to specify", ...languages],
        canCreateNew: true,
      },
      {
        name: "otherDetails.religion",
        label: "Religion",
        type: "combobox",
        options: ["Don't wish to specify", ...religions],
        canCreateNew: true,
      },
      {
        name: "otherDetails.caste",
        label: "Caste",
        type: "combobox",
        options: ["Don't wish to specify", ...castes],
        canCreateNew: true,
      }
    ]
  },
  {
    lable: "Partner Preferences",
    list: [
      {
        name: "partnerPreferences.minAge",
        label: "Minimum Age",
        type: "number",
        step: 1,
        min: 18,
      },
      {
        name: "partnerPreferences.maxAge",
        label: "Maximum Age",
        type: "number",
        step: 1,
        min: 18,
      },
      {
        name: "partnerPreferences.minQualification",
        label: "Minimum Qualification",
        type: "combobox",
        options: ["Any", ...educationLevels],
      },
      {
        name: "partnerPreferences.sector",
        label: "Sector",
        type: "combobox",
        options: ["Any", ...proffessionalSectors],
      },
      {
        name: "partnerPreferences.profession",
        label: "Profession",
        type: "combobox",
        options: ["Any", ...professions],
        canCreateNew: true,
      },
      {
        name: "partnerPreferences.minSalary",
        label: "Minimum Salary (in ₹)",
        type: "number",
        step: 1000,
        min: 10000,
      },
      {
        name: "partnerPreferences.religion",
        label: "Religion",
        type: "combobox",
        options: ["Any", ...religions],
        canCreateNew: true,
      },
      {
        name: "partnerPreferences.caste",
        label: "Caste",
        type: "combobox",
        options: ["Any", ...castes],
        canCreateNew: true,
      },
      {
        name: "partnerPreferences.motherTongue",
        label: "Mother Tongue",
        type: "combobox",
        options: ["Any", ...languages],
        canCreateNew: true,
      },
      {
        name: "partnerPreferences.location",
        label: "Location",
        type: "text"
      },
      {
        name: "partnerPreferences.expectation",
        label: "Expectations",
        type: "text"
      },
      {
        name: "partnerPreferences.maritalStatus",
        label: "Marital Status",
        type: "select",
        options: maritalStatus,
        defaultValue: "Single",
      }
    ]
  }
]

const setNestedValue = (currentObj: any, path: string, value: any) => {
  const parts = path.split('.')

  for (let i = 0; i < parts.length - 1; i++) {
    currentObj[parts[i]] = currentObj[parts[i]] || {}
    currentObj = currentObj[parts[i]]
  }

  currentObj[parts[parts.length - 1]] = value
}

export const defaultValues: userInputT = fieldList.reduce((acc, curr) => {
  curr.list.forEach((item) => {
    if (item.type === "date") {
      // const date = new Date()
      // date.setFullYear(date.getFullYear() - 18)
      setNestedValue(acc, item.name, undefined) // date
    }
    else if (item.type === "number") {
      setNestedValue(acc, item.name, item.defaultValue ?? "")
    }
    else if (item.type === "file") {
      setNestedValue(acc, item.name, item.multiple ? [] : undefined)
    }
    else {
      setNestedValue(acc, item.name, item?.defaultValue ?? "")
    }
  })
  return acc
}, {} as userInputT)
