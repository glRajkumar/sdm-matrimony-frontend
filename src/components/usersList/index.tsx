import Link from 'next/link';
import React from 'react';

interface props {
  user: any;
}
function UsersList({ user }: props) {
  return (
    <div key={user.id} className="group relative cursor-pointer overflow-hidden transition-shadow hover:shadow-xl hover:shadow-black/30 w-[200px] sm:w-[350px]  rounded-lg">

      <div className="w-[200px] h-[200px] sm:w-[350px] sm:h-[350px] mx-auto">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:rotate-3 group-hover:scale-125"
          src={user?.image}
          alt={user?.fullName}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black group-hover:from-black/70 group-hover:via-black/60 group-hover:to-black/70"></div>
      <div className="absolute inset-0 pt-10 flex translate-y-[60%] flex-col items-center justify-center px-9 text-center transition-all duration-500 group-hover:translate-y-0">
        <h1 className="font-dmserif text-3xl font-bold text-white">{user?.fullName}</h1>
        <p className="mb-3 text-lg italic text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{user?.email}</p>
        <Link href={`/users/${user.id}`}>
          <button className="rounded-full bg-neutral-900 py-2 px-3.5 font-com text-sm capitalize text-white shadow shadow-black/60">
            See More
          </button>
        </Link>
      </div>
    </div>

  );
}

export default UsersList;
