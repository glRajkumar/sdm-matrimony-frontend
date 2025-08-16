
export const approvalStatus = ["pending", "approved", "rejected"] as const
export const maritalStatus = ["Single", "Divorced", "Widowed"] as const
export const gender = ["Male", "Female"] as const

export const nakshatraMap = {
  Ashwini: 'அசுவினி',
  Bharani: 'பரணி',
  Krittika: 'கிருத்திகை',
  Rohini: 'ரோஹிணி',
  Mrigashira: 'மிருகசீரிடம்',
  Ardra: 'திருவாதிரை',
  Punarvasu: 'புனர்பூசம்',
  Pushya: 'பூசம்',
  Ashlesha: 'ஆயில்யம்',
  Magha: 'மகம்',
  'Purva Phalguni': 'பூரம்',
  'Uttara Phalguni': 'உத்திரம்',
  Hasta: 'ஹஸ்தம்',
  Chitra: 'சித்திரை',
  Swati: 'சுவாதி',
  Vishakha: 'விசாகம்',
  Anuradha: 'அனுஷம்',
  Jyeshtha: 'கேட்டை',
  Mula: 'மூலம்',
  'Purva Ashadha': 'பூராடம்',
  'Uttara Ashadha': 'உத்திராடம்',
  Shravana: 'திரோண',
  Dhanishta: 'அவிட்டம்',
  Shatabhisha: 'சதயம்',
  'Purva Bhadrapada': 'பூரட்டாதி',
  'Uttara Bhadrapada': 'உத்திரட்டாதி',
  Revati: 'ரேவதி'
} as const;

export const raasiMap = {
  Aries: 'மேஷம்',
  Taurus: 'ரிஷபம்',
  Gemini: 'மிதுனம்',
  Cancer: 'கடகம்',
  Leo: 'சிம்மம்',
  Virgo: 'கன்னி',
  Libra: 'துலாம்',
  Scorpio: 'விருச்சிகம்',
  Sagittarius: 'தனுசு',
  Capricorn: 'மகரம்',
  Aquarius: 'கும்பம்',
  Pisces: 'மீனம்'
} as const;

export const ageRange = [
  { label: 'Below 25', value: 'below_25' },
  { label: '25 to 30', value: '25_30' },
  { label: '30 to 40', value: '30_40' },
  { label: 'Above 40', value: 'above_50' },
] as const

export const salaryRange = [
  { label: 'Below ₹20,000', value: 'below_20000' },
  { label: '₹20,000 - ₹30,000', value: '20000_30000' },
  { label: '₹30,000 - ₹40,000', value: '30000_40000' },
  { label: '₹40,000 - ₹50,000', value: '40000_50000' },
  { label: 'Above ₹50,000', value: 'above_50000' },
] as const

export const aliveOptions = [
  { label: "Alive", value: true },
  { label: "Deceased", value: false }
] as const

export const acceptedImagesTypes = {
  'image/*': ['.png', ".jpg", ".jpeg", ".webp", ".avif", ".gif"],
} as const

export const tokenEnums = {
  accessToken: "accessToken",
  refreshToken: "refreshToken",
} as const

export const tokenValidity = {
  accessToken: 60 * 30, // 30 min
  refreshToken: 60 * 60 * 24 * 7, // 7 days
} as const
