import { Button } from "@/components/ui/button"

type props = {
  type?: "liked" | "disliked" | "full"
  onView?: () => void
  onAdd?: (userId: string, type: "liked" | "disliked") => void
  onRemove?: (userId: string, type: "liked" | "disliked") => void
} & Partial<userT>

function UserCard({
  _id, profileImg, fullName, maritalStatus,
  proffessionalDetails, otherDetails,
  type = "full",
  onView = () => { },
  onAdd = () => { },
  onRemove = () => { },
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
          {
            (type === "full" || type === "disliked") &&
            <Button
              size="sm"
              onClick={() => onAdd(_id as string, "liked")}
            >
              Add to Like
            </Button>
          }

          {
            (type === "full" || type === "liked") &&
            <Button
              size="sm"
              onClick={() => onAdd(_id as string, "disliked")}
            >
              Add to DisLike
            </Button>
          }

          {
            type === "liked" &&
            <Button
              size="sm"
              onClick={() => onRemove(_id as string, "liked")}
            >
              Remove from Like
            </Button>
          }

          {
            type === "disliked" &&
            <Button
              size="sm"
              onClick={() => onRemove(_id as string, "disliked")}
            >
              Remove from DisLike
            </Button>
          }

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
