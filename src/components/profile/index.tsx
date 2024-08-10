"use client"

import { useQuery } from "@tanstack/react-query";

import { getUserDetails } from "@/actions/user";

import { Input } from "../ui/input";
import { details } from "./data";
import ImageModal from "../common/image-modal";

interface props {
  userId: string;
}

function Profile({ userId }: props) {

  const { data } = useQuery({
    queryKey: ["get-user-details"],
    queryFn: () => getUserDetails(userId)
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-100">
      <div className="md:col-span-1">
        <div className="mb-4">
          <ImageModal
            // src={data?.images[0]}
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="w-full h-[360px] object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="hidden md:block h-80 overflow-y-auto">
          <div className="grid grid-cols-2 gap-2">
            {data?.images?.slice(1)?.map((image: string, i: number) => (
              <div key={i}>
                <ImageModal
                  // src={image}
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full h-56 object-cover rounded-lg shadow-md"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:col-span-2 pb-6 overflow-y-auto h-[calc(100vh-5rem)]">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {
            details.map(detail => (
              <div key={detail.label}>
                <label htmlFor="" className="df mb-2 text-sm font-medium text-gray-700">
                  {detail.icon}
                  {detail.label}
                </label>

                <Input
                  value={data?.[detail.value] || ''}
                  readOnly
                />
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Profile
