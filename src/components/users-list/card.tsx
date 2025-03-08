import Link from "next/link";

type props = {
  id: string | number
  image: string
  fullName: string
}

function Card({ id, image, fullName }: props) {
  return (
    <div className="df mb-4 border rounded-md">
      <img
        className="size-40 object-cover"
        src={image}
        alt={fullName}
      />

      <div>
        <p>{fullName}</p>

        <Link href={`/user/profile/${id}`} className="inline-block rounded-[10px] bg-neutral-900 py-1 px-2 sm:py-2 sm:px-3 font-com text-xs sm:text-sm capitalize text-white shadow-sm shadow-black/60">
          See More
        </Link>
      </div>
    </div>
  )
}

export default Card