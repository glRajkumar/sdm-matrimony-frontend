import { differenceInYears, parseISO } from 'date-fns';

export * from "./enums";

export function detectInputType(value: string) {
  if (!value) return ""

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const mobileRegex = /^\d{10}$/

  if (emailRegex.test(value)) return "email"
  if (mobileRegex.test(value)) return "mobile"
  if (value.includes("@")) return "email"
  if (/^\d+$/.test(value)) return "mobile"
  return ""
}

export function validateIdentifier(value: string) {
  if (!value) return "Email or Mobile number is required"

  const type = detectInputType(value)

  if (type === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(value) || "Please enter a valid email address"
  }

  if (type === "mobile") {
    const mobileRegex = /^\d{10}$/
    return mobileRegex.test(value) || "Please enter a valid mobile number (10 digits)"
  }

  return "Please enter a valid email or mobile number"
}

export function getAge(dob: string): number {
  const birthDate = parseISO(dob)
  return differenceInYears(new Date(), birthDate)
}

type primitiveT = string | number | boolean | symbol | bigint | undefined | null
export function isPrimitive(value: unknown): value is primitiveT {
  return ["string", "number", "boolean", "symbol", "bigint", "undefined"].includes(typeof value) || value === null
}

export function isFalsey(value: primitiveT): boolean {
  return value === null || value === "" || value === undefined || (typeof value === "number" && isNaN(value))
}

export function filterObj<T>(obj: T): T {
  if (Array.isArray(obj)) {
    const filtered = obj
      .map(item => isPrimitive(item) ? item : filterObj(item))
      .filter(item => !(isPrimitive(item) && isFalsey(item)))

    return (filtered.length > 0 ? filtered : undefined) as unknown as T
  }

  if (obj && typeof obj === "object") {
    const cleanedEntries = Object.entries(obj).reduce((acc, [key, value]) => {
      if (isPrimitive(value)) {
        if (!isFalsey(value)) {
          (acc as any)[key] = value
        }
      } else if (Array.isArray(value)) {
        const filteredArr = filterObj(value)
        if (Array.isArray(filteredArr) && filteredArr.length > 0) {
          (acc as any)[key] = filteredArr
        }
      } else {
        const cleanedObj = filterObj(value)
        if (cleanedObj && typeof cleanedObj === "object" && Object.keys(cleanedObj).length > 0) {
          (acc as any)[key] = cleanedObj
        }
      }
      return acc
    }, {} as Partial<T>)

    return (Object.keys(cleanedEntries).length > 0 ? cleanedEntries : undefined) as T
  }

  return obj
}
