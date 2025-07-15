
export const approvalStatus = ["pending", "approved", "rejected"] as const
export const maritalStatus = ["Single", "Divorced", "Widowed"] as const
export const gender = ["Male", "Female"] as const // "Other"

export const religions = ["Hindu", "Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Parsi", "Jewish", "Spiritual", "Other"] as const

const hinduCastes = ["Brahmin", "Kshatriya", "Vaishya", "Shudra", "Rajput", "Jat", "Yadav", "Maratha", "Kayastha", "Nair", "Ezhava", "Vokkaliga", "Reddy", "Lingayat", "SC", "ST", "OBC"] as const
const muslimCastes = ["Sunni", "Shia", "Syed", "Pathan", "Sheikh", "Mughal", "Qureshi"] as const
const christianCastes = ["Catholic", "Protestant", "Orthodox", "Evangelical", "Pentecostal", "Baptist"] as const
const sikhCastes = ["Jat Sikh", "Khatri", "Ramgarhia", "Arora", "Mazhabi"] as const
export const castes = [...hinduCastes, ...muslimCastes, ...christianCastes, ...sikhCastes] as const

export const languages = ["Tamil", "Telugu", "Malayalam", "Kannada", "Hindi", "English", "Bengali", "Marathi", "Gujarati", "Punjabi", "Odia", "Urdu"] as const
export const educationLevels = ["No Education", "Below SSLC", "SSLC", "HSS", "Diploma", "Bachelor's", "Master's", "Doctorate"] as const
export const proffessionalSectors = ["Government", "Private", "IT / Software", "Self-Employed / Freelance", "Entrepreneur / Business Owner", "Unemployed", "Student", "Retired", "Homemaker", "Informal Sector", "NGO / Non-Profit", "Agricultural", "Creative / Media / Entertainment", "Healthcare", "Education"] as const

export const professions = [
  "Unemployed",
  "Accountant", "AC Technician", "Actuary", "Actor", "Affiliate Marketer", "Agricultural Scientist", "Air Hostess", "Animator", "App Reskinner", "Architect", "Army Officer", "Art Director", "Artist", "Astronomer", "Author",
  "Baker", "Banker", "Barber", "Bartender", "Beautician", "Blogger", "Blockchain Developer", "Brand Manager", "Business Analyst", "Business Development Manager",
  "CA (Chartered Accountant)", "Call Center Agent", "Carpenter", "Chef", "Cleaner", "Cloud Engineer", "Civil Servant", "Clerk", "Coach (Life/Fitness)", "Content Creator", "Content Marketer", "Construction Worker", "Copywriter", "Court Clerk", "Criminal Investigator", "Curriculum Developer", "Customer Support Executive", "Cybersecurity Analyst",
  "Data Analyst", "Data Scientist", "Delivery Executive", "Dentist", "Designer", "Developer", "Digital Marketer", "DJ", "Doctor", "Driver", "Dropshipper",
  "Economist", "Editor", "Electrician", "Embedded Systems Engineer", "Embassy Staff", "Entrepreneur", "Environmental Scientist", "Event Planner",
  "Factory Worker", "Farmer", "Fashion Designer", "Filmmaker", "Financial Analyst", "Firefighter", "Fisheries Worker", "Flight Attendant", "Florist", "Forensic Analyst", "Forest Officer", "Frontend Developer", "Full Stack Developer", "Fund Manager",
  "Game Developer", "Graphic Designer",
  "Hairdresser", "Hardware Engineer", "Home Health Aide", "Homemaker", "Horticulturist", "Hotel Manager", "Housekeeper", "HR Executive",
  "Illustrator", "Influencer", "Insurance Agent", "Instructional Designer", "Interior Designer", "Investment Banker", "Irrigation Engineer", "IT Support Specialist",
  "Journalist", "Judge",
  "Lab Technician", "Lawyer", "Librarian", "Life Coach", "Loan Officer",
  "Machine Operator", "Makeup Artist", "Manager", "Market Research Analyst", "Marketing Manager", "Mason", "Mechanical Engineer", "Mechanic", "Medical Assistant", "Medical Coder", "Model", "Mobile App Developer", "Motion Graphics Artist", "Musician",
  "Network Engineer", "NGO Worker", "Nurse", "Nutritionist",
  "Occupational Therapist", "Online Tutor", "Optometrist",
  "Paramedic", "Paralegal", "Pest Control Technician", "Pharmacist", "Photographer", "Physiotherapist", "Pilot", "Plumber", "Police Officer", "Politician", "Postal Worker", "Principal", "Product Manager", "Professor", "Property Manager", "Psychiatrist", "Psychologist", "Public Health Worker", "Public Prosecutor",
  "QA Tester",
  "Radiologist", "Real Estate Agent", "Recruiter", "Religious Worker", "Researcher", "Restaurant Manager", "Retired", "Risk Manager", "Robotics Engineer",
  "Scientist", "School Principal", "Scriptwriter", "Security Guard", "Self-Employed", "SEO Specialist", "Server Admin", "Site Reliability Engineer", "Social Media Manager", "Social Worker", "Software Developer", "Software Engineer", "Sound Engineer", "Speech Therapist", "Stock Broker", "Student", "Surgeon", "Systems Administrator",
  "Tailor", "Tattoo Artist", "Teacher", "Technical Writer", "Technician", "Telemarketer", "Tour Guide", "Traffic Controller", "Train Operator", "Translator", "Travel Agent", "Tutor",
  "UI/UX Designer", "Underwriter", "UX Researcher",
  "VA (Virtual Assistant)", "Veterinarian", "Video Editor", "Videographer", "Vlogger",
  "Waiter", "Warehouse Manager", "Web Developer", "Welder", "Writer",
  "YouTuber"
] as const

export const nakshatra = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'] as const
export const planets = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn', 'Rahu', 'Ketu'] as const
export const raasi = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'] as const

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
