"use client";

import { useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ProfessionalDetails from "./professional-details";
import PartnerPreferences from "./partner-preferences";
import HoroscopeDetails from "./horoscope-details";
import PersonalDetails from "./personal-details";
import ProfileSidebar from "./profile-sidebar";
import FamilyDetails from "./family-details";
import OtherDetails from "./other-details";

const mockUser: userT = {
  _id: "123456",
  fullName: "Arjun Sharma",
  role: "user",
  password: "",
  email: "arjun.sharma@example.com",
  images: [
    "/placeholder.svg?height=400&width=300",
    "/placeholder.svg?height=400&width=300",
    "/placeholder.svg?height=400&width=300",
  ],
  isMarried: false,
  profileImg: "/placeholder.svg?height=400&width=300",
  gender: "Male",
  dob: "1990-05-15",
  maritalStatus: "Single",
  approvalStatus: "approved",
  contactDetails: {
    mobile: "+91 9876543210",
    address: "123, Park Street, Mumbai, Maharashtra",
  },
  proffessionalDetails: {
    qualification: "MBA",
    salary: 1200000,
    work: "Senior Manager at Tech Corp",
  },
  familyDetails: {
    fatherName: "Rajesh Sharma",
    motherName: "Sunita Sharma",
    noOfBrothers: 1,
    noOfSisters: 1,
    birthOrder: 1,
    isFatherAlive: true,
    isMotherAlive: true,
  },
  vedicHoroscope: {
    nakshatra: "Rohini",
    rasi: "Taurus",
    lagna: "Leo",
    dashaPeriod: "Venus Mahadasha",
    raasiChart: {
      house1: [{ planet: "Sun", degree: 15, sign: "Leo" }],
      house2: [{ planet: "Mercury", degree: 10, sign: "Virgo" }],
      house3: [],
      house4: [{ planet: "Mars", degree: 5, sign: "Scorpio" }],
      house5: [],
      house6: [],
      house7: [{ planet: "Jupiter", degree: 20, sign: "Aquarius" }],
      house8: [],
      house9: [{ planet: "Saturn", degree: 25, sign: "Aries" }],
      house10: [],
      house11: [{ planet: "Venus", degree: 8, sign: "Gemini" }],
      house12: [{ planet: "Moon", degree: 12, sign: "Cancer" }],
    },
    navamsaChart: {
      house1: [{ planet: "Sun", degree: 15, sign: "Leo" }],
      house2: [{ planet: "Mercury", degree: 10, sign: "Virgo" }],
      house3: [],
      house4: [{ planet: "Mars", degree: 5, sign: "Scorpio" }],
      house5: [],
      house6: [],
      house7: [{ planet: "Jupiter", degree: 20, sign: "Aquarius" }],
      house8: [],
      house9: [{ planet: "Saturn", degree: 25, sign: "Aries" }],
      house10: [],
      house11: [{ planet: "Venus", degree: 8, sign: "Gemini" }],
      house12: [{ planet: "Moon", degree: 12, sign: "Cancer" }],
    },
  },
  otherDetails: {
    motherTongue: "Hindi",
    houseType: "Apartment",
    height: "5'10\"",
    color: "Wheatish",
    caste: "Brahmin",
  },
  partnerPreferences: {
    minAge: 25,
    maxAge: 30,
    religion: "Hindu",
    caste: "Any",
    salary: 800000,
    qualification: "Graduate",
    work: "Any Professional",
    motherTongue: "Any",
    location: "Mumbai",
    expectation: "Looking for a well-educated, family-oriented partner",
    maritalStatus: "Single",
  },
}

function Page() {
  const [user, setUser] = useState<userT>(mockUser)
  const [activeTab, setActiveTab] = useState("personal")

  const handleUpdateUser = (updatedData: Partial<userT>) => {
    setUser((prev) => ({ ...prev, ...updatedData }))
  }

  return (
    <div className="container mx-auto py-6 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-6">
        <ProfileSidebar user={user} onUpdate={handleUpdateUser} />

        <div className="w-full md:w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="personal">Personal</TabsTrigger>
              <TabsTrigger value="family">Family</TabsTrigger>
              <TabsTrigger value="horoscope">Horoscope</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-6">
              <PersonalDetails user={user} onUpdate={handleUpdateUser} />
              <ProfessionalDetails user={user} onUpdate={handleUpdateUser} />
              <OtherDetails user={user} onUpdate={handleUpdateUser} />
            </TabsContent>

            <TabsContent value="family" className="space-y-6">
              <FamilyDetails user={user} onUpdate={handleUpdateUser} />
            </TabsContent>

            <TabsContent value="horoscope" className="space-y-6">
              <HoroscopeDetails user={user} onUpdate={handleUpdateUser} />
            </TabsContent>

            <TabsContent value="preferences" className="space-y-6">
              <PartnerPreferences user={user} onUpdate={handleUpdateUser} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default Page
