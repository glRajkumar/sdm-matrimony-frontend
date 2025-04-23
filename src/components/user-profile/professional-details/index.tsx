
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Edit from "./edit";

type props = {
  user: userT
  canEdit: boolean
}

function ProfessionalDetails({ user, canEdit }: props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Professional Details</CardTitle>
          <CardDescription>Your education and career information</CardDescription>
        </div>

        {
          canEdit &&
          <Edit user={user} />
        }
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-muted-foreground">Highest Qualification</span>
            <p className="font-medium">{user?.proffessionalDetails?.highestQualification || "---"}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Qualifications</span>
            <p className="font-medium">{user?.proffessionalDetails?.qualifications || "---"}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Profession</span>
            <p className="font-medium">{user?.proffessionalDetails?.profession || "---"}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Company Name</span>
            <p className="font-medium">{user?.proffessionalDetails?.companyName || "---"}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Monthly Salary</span>
            <p className="font-medium">₹{user?.proffessionalDetails?.salary || "---"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfessionalDetails
