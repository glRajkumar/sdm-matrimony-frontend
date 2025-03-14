
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Edit from "./edit";

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
        <div className="grid grid-cols-2 gap-4">
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
            <p className="font-medium">{new Date(user?.dob).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Marital Status</span>
            <p className="font-medium">{user?.maritalStatus}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Address</span>
            <p className="font-medium">{user?.contactDetails?.address}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PersonalDetails
