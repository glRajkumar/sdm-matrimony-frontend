import Link from "next/link";

type props = {
  id: string | number
  email: string
  image: string
  fullName: string
}

function Card({ id, image, fullName, email }: props) {
  return (
    <div className="group relative h-96 cursor-pointer overflow-hidden rounded-lg">
      <div className="aspect-square">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={image}
          alt={fullName}
        />
      </div>

      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity duration-300"></div>

      <div className="absolute inset-x-0 bottom-0 p-4 flex items-center justify-center h-1/3 group-hover:h-full transition-all duration-300">
        <div className="text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 pt-10">
          <h1 className="font-dmserif text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1">{fullName}</h1>
          <p className="text-xs sm:text-sm italic text-white mb-2">{email}</p>

          <Link href={`/user/profile/${id}`} className="rounded-full bg-neutral-900 py-1 px-2 sm:py-2 sm:px-3 font-com text-xs sm:text-sm capitalize text-white shadow shadow-black/60">
            See More
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Card