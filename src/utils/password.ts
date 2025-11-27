import { format } from "date-fns";

export function createPass(fullName: string, dob: string | Date) {
  return `${fullName.replace(/\s/g, "").slice(0, 4)}_${format(new Date(dob), "ddMMyy")}`
}
