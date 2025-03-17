
export const approvalStatus = ["pending", "approved", "rejected"] as const
export const maritalStatus = ["Single", "Divorced", "Widowed"] as const
export const gender = ["Male", "Female", "Other"] as const

export const acceptedImagesTypes = {
  'image/*': ['.png', ".jpg", ".jpeg", ".webp"],
} as const

export const tokenEnums = {
  accessToken: "access_token",
  refreshToken: "refresh_token",
} as const

export const tokenValidity = {
  accessToken: 60 * 30, // 30 min
  refreshToken: 60 * 60 * 24 * 7, // 7 days
} as const
