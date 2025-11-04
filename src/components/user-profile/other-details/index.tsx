
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Edit from "./edit";

type props = {
  user: userT
  canEdit: boolean
}

function OtherDetails({ user, canEdit }: props) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Other Details</CardTitle>
          <CardDescription>Additional personal information</CardDescription>
        </div>

        {
          canEdit &&
          <Edit user={user} />
        }
      </CardHeader>

      <CardContent>
        <div className="grid min-[400px]:grid-cols-2 gap-4">
          <div>
            <span className="text-sm text-muted-foreground">Mother Tongue</span>
            <p className="font-medium">{user?.otherDetails?.motherTongue || "---"}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Religion</span>
            <p className="font-medium">{user?.otherDetails?.religion || "---"}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Caste</span>
            <p className="font-medium">{user?.otherDetails?.caste || "---"}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Sub / Other Caste</span>
            <p className="font-medium">{user?.otherDetails?.subCaste || "---"}</p>
          </div>
          {/* <div>
            <span className="text-sm text-muted-foreground">House Type</span>
            <p className="font-medium">{user?.otherDetails?.houseType || "---"}</p>
          </div> */}
          <div>
            <span className="text-sm text-muted-foreground">Height</span>
            <p className="font-medium">{user?.otherDetails?.height || "---"}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Color</span>
            <p className="font-medium">{user?.otherDetails?.color || "---"}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default OtherDetails
