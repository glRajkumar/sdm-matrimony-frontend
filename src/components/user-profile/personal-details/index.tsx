
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Edit from "./edit";
import Dob from "./dob";

type props = {
  user: userT
  canEdit: boolean
}

function PersonalDetails({ user, canEdit }: props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Personal Details</CardTitle>
          <CardDescription>Your basic personal information</CardDescription>
        </div>

        {
          canEdit &&
          <Edit user={user} />
        }
      </CardHeader>

      <CardContent>
        <div className="grid min-[400px]:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-muted-foreground">Full Name</span>
            <p className="font-medium">{user?.fullName}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Gender</span>
            <p className="font-medium">{user?.gender}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Date of Birth</span>
            {user?.dob && <Dob user={user} />}
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Marital Status</span>
            <p className="font-medium">{user?.maritalStatus || "---"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PersonalDetails
