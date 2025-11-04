
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Edit from "./edit";

type props = {
  user: userT
  canEdit: boolean
}

function FamilyDetails({ user, canEdit }: props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Family Details</CardTitle>
          <CardDescription>Information about your family</CardDescription>
        </div>

        {
          canEdit &&
          <Edit user={user} />
        }
      </CardHeader>

      <CardContent>
        <div className="grid min-[400px]:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-muted-foreground">Father's Name</span>
            <p className="font-medium">{user?.familyDetails?.fatherName} {!user?.familyDetails?.isFatherAlive ? "(Deceased)" : ""}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Mother's Name</span>
            <p className="font-medium">{user?.familyDetails?.motherName} {!user?.familyDetails?.isMotherAlive ? "(Deceased)" : ""}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Number of Brothers</span>
            <p className="font-medium">{user?.familyDetails?.noOfBrothers}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Number of Sisters</span>
            <p className="font-medium">{user?.familyDetails?.noOfSisters}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Birth Order</span>
            <p className="font-medium">{user?.familyDetails?.birthOrder}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FamilyDetails
