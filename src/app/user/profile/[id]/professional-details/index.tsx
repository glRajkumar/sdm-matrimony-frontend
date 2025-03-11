
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Edit from "./edit";

function ProfessionalDetails({ user }: { user: userT }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Professional Details</CardTitle>
          <CardDescription>Your education and career information</CardDescription>
        </div>

        <Edit user={user} />
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-muted-foreground">Qualification</span>
            <p className="font-medium">{user?.proffessionalDetails?.qualification}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Work</span>
            <p className="font-medium">{user?.proffessionalDetails?.work}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Annual Salary</span>
            <p className="font-medium">₹{user?.proffessionalDetails?.salary}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProfessionalDetails
