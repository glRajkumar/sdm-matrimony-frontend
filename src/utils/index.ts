export * from "./enums";

function detectInputType(value: string) {
  if (!value) return ""

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const mobileRegex = /^\d{10,15}$/

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
    const mobileRegex = /^\d{10,15}$/
    return mobileRegex.test(value) || "Please enter a valid mobile number (10-15 digits)"
  }

  return "Please enter a valid email or mobile number"
}
