import { Briefcase, User } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

function UserCard({
  profileImg, fullName,
  proffessionalDetails, otherDetails,
}: Partial<userT>) {
  return (
    <Card className="mb-0 p-0 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-auto">
          <img
            className="w-full sm:w-32 h-32 object-cover"
            src={profileImg || "/imgs/user.jpg"}
            alt={fullName || "Profile Image"}
          />
        </div>

        <CardContent className="flex-1 p-4">
          <h3 className="text-lg font-semibold mb-1">{fullName}</h3>

          <div className="grid gap-2 text-sm text-muted-foreground mb-4">
            {otherDetails?.caste && (
              <div className="df">
                <User className="h-4 w-4 opacity-70" />
                <span>{otherDetails.caste} {otherDetails.subCaste ? `- ${otherDetails.subCaste}` : ""}</span>
              </div>
            )}

            {proffessionalDetails?.salary && (
              <div className="df">
                <Briefcase className="h-4 w-4 opacity-70" />
                <span>₹ {proffessionalDetails.salary.toLocaleString()} / per month</span>
              </div>
            )}
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default UserCard
