
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Edit from "./edit";

function FamilyDetails({ user, onUpdate }: { user: userT; onUpdate: (data: Partial<userT>) => void }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Family Details</CardTitle>
          <CardDescription>Information about your family</CardDescription>
        </div>
        <Edit user={user} onUpdate={onUpdate} />
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-muted-foreground">Father's Name</span>
            <p className="font-medium">{user.familyDetails.fatherName}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Mother's Name</span>
            <p className="font-medium">{user.familyDetails.motherName}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Number of Brothers</span>
            <p className="font-medium">{user.familyDetails.noOfBrothers}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Number of Sisters</span>
            <p className="font-medium">{user.familyDetails.noOfSisters}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Birth Order</span>
            <p className="font-medium">{user.familyDetails.birthOrder}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Parents Status</span>
            <p className="font-medium">
              Father: {user.familyDetails.isFatherAlive ? "Alive" : "Deceased"}, Mother:{" "}
              {user.familyDetails.isMotherAlive ? "Alive" : "Deceased"}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FamilyDetails
