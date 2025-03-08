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
        options: [
          { label: "Male", value: "male" },
          { label: "Female", value: "female" },
          { label: "Other", value: "other" }
        ],
        rules: { required: "Gender is required" },
      },
      {
        name: "dob",
        type: "text",
        label: "Date of Birth",
        rules: { required: "Date of Birth is required" },
      },
      {
        name: "height",
        type: "number",
        rules: { valueAsNumber: true },
      },
      {
        name: "color",
        type: "text",
      },
    ]
  },
  {
    lable: "Contact Details",
    list: [
      {
        name: "mobile",
        type: "number",
      },
      {
        name: "address",
        type: "text",
      },
    ]
  },
  {
    lable: "Professional Details",
    list: [
      {
        name: "qualification",
        type: "text",
        rules: { required: "Qualification is required" },
      },
      {
        name: "work",
        type: "text",
        rules: { required: "Work is required" },
      },
      {
        name: "salary",
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
        name: "fatherName",
        type: "text",
        label: "Father's Name",
        rules: { required: "Father's Name is required" },
      },
      {
        name: "motherName",
        type: "text",
        label: "Mother's Name",
        rules: { required: "Mother's Name is required" },
      },
      {
        name: "noOfBrothers",
        type: "number",
        label: "Number Of Brothers",
        rules: { valueAsNumber: true },
      },
      {
        name: "noOfSisters",
        type: "number",
        label: "Number Of Sisters",
        rules: { valueAsNumber: true },
      },
      {
        name: "birthOrder",
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
        name: "nakshatra",
        type: "text",
      },
      {
        name: "rasi",
        type: "text",
      },
      {
        name: "lagna",
        type: "text",
      },
      {
        name: "dashaPeriod",
        type: "text",
        label: "Dasha Period",
      },
      {
        name: "placeOfBirth",
        type: "text",
        label: "Place of Birth",
      },
      {
        name: "timeOfBirth",
        type: "text",
        label: "Time of Birth",
      },
    ]
  },
  {
    lable: "Other Details",
    list: [
      {
        name: "expectation",
        type: "text",
      },
      {
        name: "houseType",
        type: "text",
        label: "House Type",
      },
    ]
  },
  {
    lable: "Partner Preferences",
    list: [
      {
        name: "minAge",
        type: "number",
        label: "Minimum Age",
        rules: { valueAsNumber: true },
      },
      {
        name: "maxAge",
        type: "number",
        label: "Maximum Age",
        rules: { valueAsNumber: true },
      },
      {
        name: "qualification",
        type: "text",
        label: "Qualification",
      },
      {
        name: "work",
        type: "text",
        label: "Work",
      },
      {
        name: "salary",
        type: "number",
        label: "Salary per Month (in ₹)",
        rules: { valueAsNumber: true },
      },
      {
        name: "religion",
        type: "text",
      },
      {
        name: "caste",
        type: "text",
      },
      {
        name: "motherTongue",
        type: "text",
        label: "Mother Tongue",
      },
      {
        name: "location",
        type: "text",
      },
    ]
  }
]