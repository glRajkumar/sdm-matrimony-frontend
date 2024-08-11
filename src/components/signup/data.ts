type base = {
  name: string;
  label?: string;
};

type BaseField = base & {
  type: "text" | "number" | "email";
};

type SelectField = base & {
  type: "select";
  options: string[];
};

type fields = BaseField | SelectField;

export const fieldList: fields[] = [
  {
    name: "fullName",
    type: "text",
    label: "Name",
  },
  {
    name: "email",
    type: "email",
  },
  {
    name: "password",
    type: "text",
  },
  {
    name: "gender",
    type: "select",
    options: ["Male", "Female", "Other"],
  },
  {
    name: "dob",
    type: "text",
    label: "Date of Birth",
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
  },
  {
    name: "fatherName",
    type: "text",
    label: "Father's Name",
  },
  {
    name: "motherName",
    type: "text",
    label: "Mother's Name",
  },
  {
    name: "noOfBrothers",
    type: "number",
    label: "Number Of Brothers",
  },
  {
    name: "noOfSisters",
    type: "number",
    label: "Number Of Sisters",
  },
  {
    name: "birthOrder",
    type: "number",
    label: "Birth Order",
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
  },
  {
    name: "color",
    type: "text",
  },
];

type InitialFields = {
  [K in (typeof fieldList)[number]["name"]]: string;
};

export const initialData: InitialFields = fieldList.reduce((prev, curr) => {
  prev[curr.name as keyof InitialFields] = "";
  return prev;
}, {} as InitialFields);
