
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Edit from "./edit";

function OtherDetails({ user, onUpdate }: { user: userT; onUpdate: (data: Partial<userT>) => void }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Other Details</CardTitle>
          <CardDescription>Additional personal information</CardDescription>
        </div>
        <Edit user={user} onUpdate={onUpdate} />
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-muted-foreground">Mother Tongue</span>
            <p className="font-medium">{user.otherDetails.motherTongue}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">House Type</span>
            <p className="font-medium">{user.otherDetails.houseType}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Height</span>
            <p className="font-medium">{user.otherDetails.height}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Complexion</span>
            <p className="font-medium">{user.otherDetails.color}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Caste</span>
            <p className="font-medium">{user.otherDetails.caste}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default OtherDetails
