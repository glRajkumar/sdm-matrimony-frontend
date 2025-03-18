import { Path } from 'react-hook-form';

import { gender, maritalStatus, languages, religions, castes, nakshatra, raasi } from '@/utils';
import { userInputT } from '@/utils/user-schema';

type BaseField = {
  name: Path<userInputT>
  label: string
}

type TextField = BaseField & {
  type: "text" | "email" | "password" | "tel" | "number" | "file" | "time"
}

type SelectField = BaseField & {
  type: "select"
  options: optionsT
}

type Field = TextField | SelectField

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
        type: "text",
      },
      {
        name: "maritalStatus",
        label: "Marital Status",
        type: "select",
        options: maritalStatus,
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
        name: "proffessionalDetails.qualification",
        label: "Qualification",
        type: "text"
      },
      {
        name: "proffessionalDetails.work",
        label: "Work",
        type: "text"
      },
      {
        name: "proffessionalDetails.salary",
        label: "Salary per Month (in ₹)",
        type: "number"
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
        name: "familyDetails.noOfBrothers",
        label: "Number of Brothers",
        type: "number"
      },
      {
        name: "familyDetails.noOfSisters",
        label: "Number of Sisters",
        type: "number"
      },
      {
        name: "familyDetails.birthOrder",
        label: "Birth Order",
        type: "number"
      }
    ]
  },
  {
    lable: "Horoscope Details",
    list: [
      {
        name: "vedicHoroscope.nakshatra",
        label: "Nakshatra",
        type: "select",
        options: nakshatra,
      },
      {
        name: "vedicHoroscope.rasi",
        label: "Rasi",
        type: "select",
        options: raasi,
      },
      {
        name: "vedicHoroscope.lagna",
        label: "Lagna",
        type: "select",
        options: raasi,
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
      }
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
        type: "select",
        options: languages,
      },
      {
        name: "otherDetails.religion",
        label: "Religion",
        type: "select",
        options: religions,
      },
      {
        name: "otherDetails.caste",
        label: "Caste",
        type: "select",
        options: castes,
      }
    ]
  },
  {
    lable: "Partner Preferences",
    list: [
      {
        name: "partnerPreferences.minAge",
        label: "Minimum Age",
        type: "number"
      },
      {
        name: "partnerPreferences.maxAge",
        label: "Maximum Age",
        type: "number"
      },
      {
        name: "partnerPreferences.qualification",
        label: "Qualification",
        type: "text"
      },
      {
        name: "partnerPreferences.work",
        label: "Work",
        type: "text"
      },
      {
        name: "partnerPreferences.salary",
        label: "Salary per Month (in ₹)",
        type: "number"
      },
      {
        name: "partnerPreferences.religion",
        label: "Religion",
        type: "select",
        options: religions,
      },
      {
        name: "partnerPreferences.caste",
        label: "Caste",
        type: "select",
        options: castes,
      },
      {
        name: "partnerPreferences.motherTongue",
        label: "Mother Tongue",
        type: "select",
        options: languages,
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
      }
    ]
  }
]