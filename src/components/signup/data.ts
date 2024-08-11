import { RegisterOptions } from "react-hook-form";
import { itemType } from "../ui/select";

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
  options: itemType[];
};

type fields = BaseField | SelectField;

export const fieldList: fields[] = [
  {
    name: "fullName",
    type: "text",
    label: "Name",
    rules: { required: "Name is required" },
  },
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
    name: "qualification",
    type: "text",
  },
  {
    name: "work",
    type: "text",
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
  {
    name: "placeOfBirth",
    type: "text",
    label: "Place of Birth",
  },
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
    name: "expectation",
    type: "text",
  },
  {
    name: "formalities",
    type: "text",
  },
  {
    name: "houseType",
    type: "text",
    label: "House Type",
  },
  {
    name: "address",
    type: "text",
  },
  {
    name: "dashaPeriod",
    type: "text",
    label: "Dasha Period",
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
];

type InitialFields = {
  [K in (typeof fieldList)[number]["name"]]: string | number;
};

export const initialData: InitialFields = fieldList.reduce((prev, curr) => {
  prev[curr.name as keyof InitialFields] = curr.rules?.valueAsNumber ? 0 : "";
  return prev;
}, {} as InitialFields);
