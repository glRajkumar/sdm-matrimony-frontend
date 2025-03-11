import { cookies } from 'next/headers';

import { getUserDetails } from '@/actions';
import { decodeJwt } from '@/server/utils/jwt-helpers';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProfessionalDetails from "./professional-details";
import PartnerPreferences from "./partner-preferences";
import HoroscopeDetails from "./horoscope-details";
import PersonalDetails from "./personal-details";
import ProfileSidebar from "./profile-sidebar";
import FamilyDetails from "./family-details";
import OtherDetails from "./other-details";
import { redirect } from 'next/navigation';

type props = {
  params: Promise<{ id: string }>
}

async function Page({ params }: props) {
  const { id: userId } = await params
  if (!userId) return redirect("/user")

  const cookieStore = await cookies()
  const token = cookieStore.get('sdm')?.value || ""
  if (!token) return redirect("/user")

  const loggedInUser = await decodeJwt(token)
  const loggedInUserId = loggedInUser?._id as string || ""
  if (!loggedInUserId) return redirect("/user")

  const user = await getUserDetails(userId)
  const canEdit = userId === loggedInUserId

  if (!user) return redirect("/user")

  return (
    <>
      <ProfileSidebar user={user} canEdit={canEdit} />

      <div className="w-full md:w-2/3">
        <Tabs defaultValue="personal">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="family">Family</TabsTrigger>
            <TabsTrigger value="horoscope">Horoscope</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-6">
            <PersonalDetails user={user} canEdit={canEdit} />
            <ProfessionalDetails user={user} canEdit={canEdit} />
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

export default Page
