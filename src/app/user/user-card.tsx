import { Button } from "@/components/ui/button"

type props = {
  type?: "liked" | "disliked" | "full"
  onView?: () => void
} & Partial<userT>

function UserCard({
  _id, profileImg, fullName, maritalStatus,
  proffessionalDetails, otherDetails,
  type = "full", onView = () => { },
}: props) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-2 mb-4 border rounded-md overflow-hidden">
      <img
        className="size-40 object-cover"
        src={profileImg}
        alt={fullName}
      />

      <div>
        <div>
          <p>{fullName}</p>
          <p>{otherDetails?.caste}</p>
          <p>₹ {proffessionalDetails?.salary} / per month</p>
          <p>{maritalStatus}</p>
        </div>

        <div className="df">
          <Button
            size="sm"
            onClick={onView}
          >
            View
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UserCard
