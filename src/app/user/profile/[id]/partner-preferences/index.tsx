
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Edit from "./edit";

type props = {
  user: userT
  canEdit: boolean
}

function PartnerPreferences({ user, canEdit }: props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Partner Preferences</CardTitle>
          <CardDescription>Your preferences for a life partner</CardDescription>
        </div>

        {
          canEdit &&
          <Edit user={user} />
        }
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <span className="text-sm text-muted-foreground">Age Range</span>
            <p className="font-medium">
              {user?.partnerPreferences?.minAge} - {user?.partnerPreferences?.maxAge} years
            </p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Religion</span>
            <p className="font-medium">{user?.partnerPreferences?.religion}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Caste</span>
            <p className="font-medium">{user?.partnerPreferences?.caste}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Marital Status</span>
            <p className="font-medium">{user?.partnerPreferences?.maritalStatus}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Qualification</span>
            <p className="font-medium">{user?.partnerPreferences?.qualification}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Profession</span>
            <p className="font-medium">{user?.partnerPreferences?.work}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Expected Salary</span>
            <p className="font-medium">₹{user?.partnerPreferences?.salary} per annum</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Mother Tongue</span>
            <p className="font-medium">{user?.partnerPreferences?.motherTongue}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Location</span>
            <p className="font-medium">{user?.partnerPreferences?.location}</p>
          </div>
        </div>

        <div>
          <span className="text-sm text-muted-foreground">Expectations</span>
          <p className="font-medium mt-1">{user?.partnerPreferences?.expectation}</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default PartnerPreferences
