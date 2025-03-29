"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";

import { useUpdateProfile } from "@/hooks/use-user";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import EditProfileImageDialog from "./edit-profile-image-dialog";
import AddImageDialog from "./add-image-dialog";
import ImageView from "./image-view";

type props = {
  user: userT
  canEdit: boolean
}

function ProfileSidebar({ user, canEdit }: props) {
  const { mutate, isPending } = useUpdateProfile()

  const handleDeleteImage = (imageUrl: string) => {
    const isAdmin = window.location.pathname.includes("admin")
    mutate({
      ...(isAdmin && { _id: user._id }),
      images: user?.images?.filter(img => img !== imageUrl),
      ...(user?.profileImg === imageUrl && { profileImg: "" })
    })
  }

  function setAsProfilePic(url: string) {
    const isAdmin = window.location.pathname.includes("admin")
    mutate({
      ...(isAdmin && { _id: user._id }),
      profileImg: url
    })
  }

  return (
    <div className="w-full md:w-1/3">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 mb-4">
              <Image
                src={user?.profileImg || "/imgs/user.jpg"}
                alt={user?.fullName}
                fill
                className="rounded-full object-cover border-4 border-primary/20"
              />

              {
                canEdit &&
                <EditProfileImageDialog _id={user._id} />
              }
            </div>

            <h2 className="text-2xl font-bold">{user?.fullName}</h2>
            <p className="text-muted-foreground">{user?.proffessionalDetails?.companyName}</p>
          </div>
        </CardContent>
      </Card>

      <Card className="my-6">
        <CardHeader>
          <CardTitle className="text-lg">Photo Gallery</CardTitle>
          <CardDescription>Your profile photos</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 gap-2">
            {
              user?.images.map((image, index) => (
                <div key={index} className="relative group aspect-square">
                  <ImageView
                    image={image}
                    images={user?.images}
                    profileImg={user?.profileImg}
                    setAsProfilePic={setAsProfilePic}
                  />
                  {
                    canEdit &&
                    <button
                      className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => handleDeleteImage(image)}
                      disabled={isPending}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  }
                </div>
              ))
            }

            {
              canEdit &&
              <AddImageDialog _id={user._id} />
            }
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileSidebar
