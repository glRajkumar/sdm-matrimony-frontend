
type rolesT = "user" | "admin" | "super-admin"

type genderT = 'Male' | 'Female' // | 'Other'

type approvalStatusT = 'pending' | 'approved' | 'rejected'

type maritalStatusT = 'Single' | 'Divorced' | 'Widowed'

type subscribedToT = "basic" | "gold" | "diamond" | "platinum"

type currentPlanT = {
  _id: string
  amount: number
  subscribedTo: subscribedToT
  expiryDate: string
  noOfProfilesCanView: number
  isAssisted: boolean
  assistedMonths: number
}

type userT = {
  _id: string
  fullName: string
  role: "user"
  email: string
  password: string
  images: string[]
  isMarried: boolean
  profileImg: string
  gender: genderT
  dob: string
  maritalStatus: maritalStatusT
  approvalStatus: approvalStatusT
  contactDetails: {
    mobile: string
    address: string
  }
  proffessionalDetails: {
    highestQualification: string
    qualifications: string
    companyName: string
    profession: string
    sector: string
    salary: number
  }
  familyDetails: {
    fatherName: string
    motherName: string
    noOfBrothers: number
    noOfSisters: number
    birthOrder: number
    isFatherAlive: boolean
    isMotherAlive: boolean
  }
  vedicHoroscope: {
    nakshatra: string
    rasi: string
    lagna: string
    dashaPeriod: string
    vedicHoroscopePic: string
    dosham: string
  }
  otherDetails: {
    motherTongue: string
    houseType: string
    religion: string
    height: string
    color: string
    caste: string
  }
  partnerPreferences: {
    minAge: number
    maxAge: number
    religion: string
    caste: string
    minSalary: number
    minQualification: string
    profession: string
    sector: string
    motherTongue: string
    location: string
    expectation: string
    maritalStatus: maritalStatusT
  }
  isBlocked: boolean
  isDeleted: boolean
  isVerified: boolean
  currentPlan: currentPlanT
}
