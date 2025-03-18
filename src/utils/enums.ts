
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

export const ageRange = [
  { label: 'Below 25', value: 'below_25' },
  { label: '25 to 30', value: '25_30' },
  { label: '30 to 40', value: '30_40' },
  { label: 'Above 40', value: 'above_50' },
]

export const salaryRange = [
  { label: 'Below ₹20,000', value: 'below_20000' },
  { label: '₹20,000 - ₹30,000', value: '20000_30000' },
  { label: '₹30,000 - ₹40,000', value: '30000_40000' },
  { label: '₹40,000 - ₹50,000', value: '40000_50000' },
  { label: 'Above ₹50,000', value: 'above_50000' },
]

export const aliveOptions = [
  { label: "Alive", value: true },
  { label: "Deceased", value: false }
]

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
