import { gender, maritalStatus } from "@/utils/enums";
import { RegisterOptions } from "react-hook-form";

type base = {
  name: string;
  label?: string;
  rules?: RegisterOptions;
};

type BaseField = base & {
  type: "text" | "number" | "email";
};

type SelectField = base & {
  type: "select";
  options: {
    label: string
    value: string
  }[];
};

export type fields = BaseField | SelectField;

type FieldListType = {
  lable: string
  list: fields[]
};

export const fieldList: FieldListType[] = [
  {
    lable: "Account Details",
    list: [
      {
        name: "email",
        type: "email",
        rules: {
          required: "Email is required",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Invalid email address"
          }
        },
      },
      {
        name: "password",
        type: "text",
        rules: {
          required: "Password is required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters"
          }
        },
      },
    ]
  },
  {
    lable: "Personal Details",
    list: [
      {
        name: "fullName",
        type: "text",
        label: "Name",
        rules: { required: "Name is required" },
      },
      {
        name: "gender",
        type: "select",
        options: gender.map(gen => ({ label: gen, value: gen })),
        rules: { required: "Gender is required" },
      },
      {
        name: "dob",
        type: "text",
        label: "Date of Birth",
        rules: { required: "Date of Birth is required" },
      },
      {
        name: "maritalStatus",
        type: "select",
        label: "Marital Status",
        options: maritalStatus.map(status => ({ label: status, value: status })),
        rules: { required: "Marital Status is required" },
      }
    ]
  },
  {
    lable: "Contact Details",
    list: [
      {
        name: "contactDetails.mobile",
        type: "number",
        label: "Mobile Number",
      },
      {
        name: "contactDetails.address",
        type: "text",
        label: "Address",
      },
    ]
  },
  {
    lable: "Professional Details",
    list: [
      {
        name: "proffessionalDetails.qualification",
        type: "text",
        label: "Qualification",
        rules: { required: "Qualification is required" },
      },
      {
        name: "proffessionalDetails.work",
        type: "text",
        label: "Work",
        rules: { required: "Work is required" },
      },
      {
        name: "proffessionalDetails.salary",
        type: "number",
        label: "Salary per Month (in ₹)",
        rules: {
          required: "Salary is requird",
          min: {
            value: 0,
            message: "Salary cannot be negative"
          },
          valueAsNumber: true
        },
      },
    ]
  },
  {
    lable: "Family Details",
    list: [
      {
        name: "familyDetails.fatherName",
        type: "text",
        label: "Father's Name",
        rules: { required: "Father's Name is required" },
      },
      {
        name: "familyDetails.motherName",
        type: "text",
        label: "Mother's Name",
        rules: { required: "Mother's Name is required" },
      },
      {
        name: "familyDetails.noOfBrothers",
        type: "number",
        label: "Number Of Brothers",
        rules: { valueAsNumber: true },
      },
      {
        name: "familyDetails.noOfSisters",
        type: "number",
        label: "Number Of Sisters",
        rules: { valueAsNumber: true },
      },
      {
        name: "familyDetails.birthOrder",
        type: "number",
        label: "Birth Order",
        rules: { valueAsNumber: true },
      },
    ]
  },
  {
    lable: "Horoscope Details",
    list: [
      {
        name: "vedicHoroscope.nakshatra",
        label: "Nakshatra",
        type: "text",
      },
      {
        name: "vedicHoroscope.rasi",
        label: "Rasi",
        type: "text",
      },
      {
        name: "vedicHoroscope.lagna",
        label: "Lagna",
        type: "text",
      },
      {
        name: "vedicHoroscope.dashaPeriod",
        label: "Dasha Period",
        type: "text",
      },
      {
        name: "vedicHoroscope.placeOfBirth",
        label: "Place of Birth",
        type: "text",
      },
      {
        name: "vedicHoroscope.timeOfBirth",
        label: "Time of Birth",
        type: "text",
      },
    ]
  },
  {
    lable: "Other Details",
    list: [
      {
        name: "otherDetails.height",
        label: "Height (in cm)",
        type: "number",
        rules: { valueAsNumber: true },
      },
      {
        name: "otherDetails.color",
        type: "text",
        label: "Color",
      },
      {
        name: "otherDetails.houseType",
        type: "text",
        label: "House Type",
      },
      {
        name: "otherDetails.motherTongue",
        type: "text",
        label: "Mother Tongue",
      },
      {
        name: "otherDetails.caste",
        type: "text",
        label: "Caste",
      }
    ]
  },
  {
    lable: "Partner Preferences",
    list: [
      {
        name: "partnerPreferences.minAge",
        type: "number",
        label: "Minimum Age",
        rules: { valueAsNumber: true },
      },
      {
        name: "partnerPreferences.maxAge",
        type: "number",
        label: "Maximum Age",
        rules: { valueAsNumber: true },
      },
      {
        name: "partnerPreferences.qualification",
        type: "text",
        label: "Qualification",
      },
      {
        name: "partnerPreferences.work",
        type: "text",
        label: "Work",
      },
      {
        name: "partnerPreferences.salary",
        type: "number",
        label: "Salary per Month (in ₹)",
        rules: { valueAsNumber: true },
      },
      {
        name: "partnerPreferences.religion",
        type: "text",
        label: "Religion",
      },
      {
        name: "partnerPreferences.caste",
        type: "text",
        label: "Caste",
      },
      {
        name: "partnerPreferences.motherTongue",
        type: "text",
        label: "Mother Tongue",
      },
      {
        name: "partnerPreferences.location",
        type: "text",
        label: "Location",
      },
      {
        name: "partnerPreferences.expectation",
        type: "text",
        label: "Expectations",
      },
      {
        name: "partnerPreferences.maritalStatus",
        type: "select",
        label: "Marital Status",
        options: maritalStatus.map(status => ({ label: status, value: status })),
      }
    ]
  }
]