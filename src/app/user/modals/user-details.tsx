"use client";

import { useState } from "react";

import { useUserDetails } from "@/hooks/use-user";
import useUIStore from "@/store/ui";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface InfoItemProps {
  label: string
  value: string | React.ReactNode
  className?: string
}

function InfoItem({ label, value, className = "" }: InfoItemProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}

function HoroscopeChart({ chart }: { chart: chartT }) {
  return (
    <div className="grid grid-cols-3 grid-rows-3 gap-1 aspect-square">
      {Array.from({ length: 12 }, (_, i) => i + 1).map((houseNum) => {
        const houseName = `house${houseNum}` as keyof chartT
        const planets = chart[houseName]

        // Calculate position in the 3x3 grid based on traditional chart layout
        let row, col
        switch (houseNum) {
          case 1:
            row = 0
            col = 0
            break
          case 2:
            row = 0
            col = 1
            break
          case 3:
            row = 0
            col = 2
            break
          case 4:
            row = 1
            col = 2
            break
          case 5:
            row = 2
            col = 2
            break
          case 6:
            row = 2
            col = 1
            break
          case 7:
            row = 2
            col = 0
            break
          case 8:
            row = 1
            col = 0
            break
          case 9:
            row = 0
            col = 0
            break
          case 10:
            row = 0
            col = 1
            break
          case 11:
            row = 0
            col = 2
            break
          case 12:
            row = 1
            col = 2
            break
          default:
            row = 1
            col = 1 // Center
        }

        return (
          <div
            key={houseNum}
            className="border p-2 text-xs h-full flex flex-col"
            style={{
              gridRow: row + 1,
              gridColumn: col + 1,
              minHeight: "80px",
            }}
          >
            <div className="font-semibold mb-1">House {houseNum}</div>
            {planets.length > 0 ? (
              <div className="space-y-1">
                {planets.map((planet, idx) => (
                  <div key={idx} className="flex justify-between">
                    <span>{planet.planet}</span>
                    <span>
                      {planet.sign} {planet.degree}°
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground italic">No planets</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function getOrdinalSuffix(n: number): string {
  if (n > 3 && n < 21) return "th"
  switch (n % 10) {
    case 1:
      return "st"
    case 2:
      return "nd"
    case 3:
      return "rd"
    default:
      return "th"
  }
}

const tabs = [
  {
    value: "basic",
    label: "Basic Info"
  },
  {
    value: "professional",
    label: "Professional"
  },
  {
    value: "family",
    label: "Family"
  },
  {
    value: "horoscope",
    label: "Horoscope"
  },
  {
    value: "preferences",
    label: "Preferences"
  }
]

function UserDetails() {
  const close = useUIStore(s => s.close)
  const open = useUIStore(s => s.open)
  const data = useUIStore(s => s.data)

  const { data: user } = useUserDetails(data?._id)
  const [activeTab, setActiveTab] = useState("basic")

  return (
    <Dialog open={open === "user-details"} onOpenChange={close}>
      <DialogContent className="max-h-[90vh] sm:max-w-6xl p-0">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold">{user?.fullName}'s Profile</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start rounded-none border-b p-0 bg-transparent">
            {
              tabs.map(tab => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-primary data-[state=active]:shadow-none"
                >
                  {tab.label}
                </TabsTrigger>
              ))
            }
          </TabsList>

          <div className="h-[calc(90vh-10rem)] px-6 py-4 overflow-y-auto">
            <TabsContent value="basic" className="m-0 mt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <img
                    src={user?.profileImg || "/placeholder.svg?height=300&width=300"}
                    alt={user?.fullName}
                    className="w-full rounded-lg object-cover aspect-square"
                  />
                  <div className="mt-4 space-y-2">
                    {user?.images && user?.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2">
                        {user?.images.slice(0, 3).map((img, i) => (
                          <img
                            key={i}
                            src={img || "/placeholder.svg"}
                            alt={`${user?.fullName} ${i + 1}`}
                            className="w-full rounded-md aspect-square object-cover"
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <InfoItem label="Full Name" value={user?.fullName} />
                      <InfoItem label="Gender" value={user?.gender} />
                      <InfoItem label="Date of Birth" value={user?.dob ? new Date(user?.dob).toLocaleDateString() : ""} />
                      <InfoItem label="Marital Status" value={user?.maritalStatus} />
                    </div>
                  </div>

                  {/* <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Contact Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <InfoItem label="Email" value={user?.email} />
                      <InfoItem label="Mobile" value={user?.contactDetails?.mobile} />
                      <InfoItem label="Address" value={user?.contactDetails?.address} className="col-span-2" />
                    </div>
                  </div> */}

                  <Separator />

                  <div>
                    <h3 className="text-lg font-semibold mb-2">Other Details</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <InfoItem label="Mother Tongue" value={user?.otherDetails?.motherTongue} />
                      <InfoItem label="House Type" value={user?.otherDetails?.houseType} />
                      <InfoItem label="Height" value={user?.otherDetails?.height} />
                      <InfoItem label="Complexion" value={user?.otherDetails?.color} />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="professional" className="m-0 mt-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Professional Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem label="Qualification" value={user?.proffessionalDetails?.qualification} />
                    <InfoItem label="Occupation" value={user?.proffessionalDetails?.work} />
                    <InfoItem label="Annual Income" value={`₹${user?.proffessionalDetails?.salary.toLocaleString()}`} />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="family" className="m-0 mt-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Family Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem
                      label="Father's Name"
                      value={`${user?.familyDetails?.fatherName} ${!user?.familyDetails?.isFatherAlive ? "(Late)" : ""}`}
                    />
                    <InfoItem
                      label="Mother's Name"
                      value={`${user?.familyDetails?.motherName} ${!user?.familyDetails?.isMotherAlive ? "(Late)" : ""}`}
                    />
                    <InfoItem label="Brothers" value={user?.familyDetails?.noOfBrothers.toString()} />
                    <InfoItem label="Sisters" value={user?.familyDetails?.noOfSisters.toString()} />
                    <InfoItem
                      label="Birth Order"
                      value={`${user?.familyDetails?.birthOrder}${getOrdinalSuffix(user?.familyDetails?.birthOrder as number)} child`}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="horoscope" className="m-0 mt-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Vedic Horoscope Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InfoItem label="Nakshatra" value={user?.vedicHoroscope?.nakshatra} />
                    <InfoItem label="Rasi" value={user?.vedicHoroscope?.rasi} />
                    <InfoItem label="Lagna" value={user?.vedicHoroscope?.lagna} />
                    <InfoItem label="Dasha Period" value={user?.vedicHoroscope?.dashaPeriod} />
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Raasi Chart</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2">Raasi Chart</h4>
                      <div className="border rounded-lg p-4">
                        <HoroscopeChart chart={user?.vedicHoroscope?.raasiChart as any} />
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2">Navamsa Chart</h4>
                      <div className="border rounded-lg p-4">
                        <HoroscopeChart chart={user?.vedicHoroscope?.navamsaChart as any} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="preferences" className="m-0 mt-2">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Partner Preferences</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem
                      label="Age Range"
                      value={`${user?.partnerPreferences?.minAge} to ${user?.partnerPreferences?.maxAge} years`}
                    />
                    <InfoItem label="Religion" value={user?.partnerPreferences?.religion} />
                    <InfoItem label="Caste" value={user?.partnerPreferences?.caste} />
                    <InfoItem label="Minimum Salary" value={`₹${user?.partnerPreferences?.salary.toLocaleString()}`} />
                    <InfoItem label="Qualification" value={user?.partnerPreferences?.qualification} />
                    <InfoItem label="Occupation" value={user?.partnerPreferences?.work} />
                    <InfoItem label="Mother Tongue" value={user?.partnerPreferences?.motherTongue} />
                    <InfoItem label="Location" value={user?.partnerPreferences?.location} />
                    <InfoItem label="Preferred Marital Status" value={user?.partnerPreferences?.maritalStatus} />
                    <InfoItem label="Expectations" value={user?.partnerPreferences?.expectation} className="col-span-2" />
                  </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

export default UserDetails
