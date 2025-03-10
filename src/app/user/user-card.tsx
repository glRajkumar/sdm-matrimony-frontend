

function UserCard({
  _id, profileImg, fullName, maritalStatus, proffessionalDetails,
  otherDetails
}: Partial<userT>) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-2 mb-4 border rounded-md overflow-hidden">
      <img
        className="size-40 object-cover"
        src={profileImg}
        alt={fullName}
      />

      <div>
        <p>{fullName}</p>
        <p>{otherDetails?.caste}</p>
        <p>₹ {proffessionalDetails?.salary} / per month</p>
        <p>{maritalStatus}</p>
      </div>
    </div>
  )
}

export default UserCard
