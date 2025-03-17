
export const approvalStatus = ["pending", "approved", "rejected"] as const
export const maritalStatus = ["Single", "Divorced", "Widowed"] as const
export const gender = ["Male", "Female"] as const // "Other"

export const religions = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Parsi", "Jewish", "Spiritual", "Other"] as const

const hinduCastes = ["Brahmin", "Kshatriya", "Vaishya", "Shudra", "Rajput", "Jat", "Yadav", "Maratha", "Kayastha", "Nair", "Ezhava", "Vokkaliga", "Reddy", "Lingayat", "SC", "ST", "OBC"] as const
const muslimCastes = ["Sunni", "Shia", "Syed", "Pathan", "Sheikh", "Mughal", "Qureshi"] as const
const christianCastes = ["Catholic", "Protestant", "Orthodox", "Evangelical", "Pentecostal", "Baptist"] as const
const sikhCastes = ["Jat Sikh", "Khatri", "Ramgarhia", "Arora", "Mazhabi"] as const
export const castes = [...hinduCastes, ...muslimCastes, ...christianCastes, ...sikhCastes] as const

export const languages = ["Hindi", "English", "Bengali", "Tamil", "Telugu", "Marathi", "Gujarati", "Punjabi", "Malayalam", "Kannada", "Odia", "Urdu"] as const
export const educationLevels = ["High School", "Diploma", "Bachelor's", "Master's", "PhD", "Doctor"] as const
export const occupations = ["Software Engineer", "Doctor", "Lawyer", "Business", "Government Job", "Teacher", "Banking", "Self-Employed"] as const

export const nakshatra = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'] as const
export const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'] as const
export const raasi = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] as const

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
