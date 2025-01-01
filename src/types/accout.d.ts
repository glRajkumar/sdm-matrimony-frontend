
type rolesT = "user" | "broker" | "admin"

type genderT = 'male' | 'female' | 'other'

type approvalStatusT = 'pending' | 'approved' | 'rejected'

type userT = {
  _id: string
  fullName: string
  role: "user"
  email: string
  password: string
  images: string[]
  isMarried: boolean
  gender: genderT
  dob: string
  placeOfBirth: string
  nakshatra: string
  rasi: string
  lagna: string
  qualification: string
  work: string
  salary: number
  fatherName: string
  motherName: string
  noOfBrothers: number
  noOfSisters: number
  birthOrder: number
  expectation: string
  formalities: string
  houseType: string
  address: string
  dashaPeriod: string
  height: string
  color: string
  approvalStatus: approvalStatusT
}
