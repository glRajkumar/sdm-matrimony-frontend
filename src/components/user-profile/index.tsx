import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProfessionalDetails from "./professional-details";
import PartnerPreferences from "./partner-preferences";
import HoroscopeDetails from "./horoscope-details";
import PersonalDetails from "./personal-details";
import ProfileSidebar from "./profile-sidebar";
import ContactDetails from "./contact-details";
import FamilyDetails from "./family-details";
import OtherDetails from "./other-details";

type props = {
  user: userT
  canEdit: boolean
}

function UserProfile({ user, canEdit }: props) {
  return (
    <>
      <ProfileSidebar user={user} canEdit={canEdit} />

      <div className="w-full md:w-2/3">
        <Tabs defaultValue="personal">
          <TabsList className="grid grid-cols-4 mb-2">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="horoscope">Horoscope</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <PersonalDetails user={user} canEdit={canEdit} />
            <ProfessionalDetails user={user} canEdit={canEdit} />
            <ContactDetails user={user} canEdit={canEdit} />
            <OtherDetails user={user} canEdit={canEdit} />
          </TabsContent>

          <TabsContent value="family" className="space-y-6">
            <FamilyDetails user={user} canEdit={canEdit} />
          </TabsContent>

          <TabsContent value="horoscope" className="space-y-6">
            <HoroscopeDetails user={user} canEdit={canEdit} />
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <PartnerPreferences user={user} canEdit={canEdit} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

export default UserProfile
