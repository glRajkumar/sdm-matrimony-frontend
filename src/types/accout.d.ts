
type rolesT = "user" | "broker" | "admin"

type genderT = 'Male' | 'Female' // | 'Other'

type approvalStatusT = 'pending' | 'approved' | 'rejected'

type maritalStatusT = 'Single' | 'Divorced' | 'Widowed'

type planetT = {
  planet: string
  degree: number
  sign: string
}

type chartT = {
  house1: planetT[]
  house2: planetT[]
  house3: planetT[]
  house4: planetT[]
  house5: planetT[]
  house6: planetT[]
  house7: planetT[]
  house8: planetT[]
  house9: planetT[]
  house10: planetT[]
  house11: planetT[]
  house12: planetT[]
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
    raasiChart: chartT
    navamsaChart: chartT
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
    motherTongue: string
    location: string
    expectation: string
    maritalStatus: maritalStatusT
  }
  isBlocked: boolean
  isDeleted: boolean
}
