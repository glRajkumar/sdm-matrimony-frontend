
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
