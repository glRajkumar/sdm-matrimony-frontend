"use client";

import { Trash2 } from "lucide-react";
import Image from "next/image";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import EditProfileImageDialog from "./edit-profile-image-dialog";
import AddImageDialog from "./add-image-dialog";
import ImageView from "./image-view";

type props = {
  user: userT
  canEdit: boolean
}

function ProfileSidebar({ user, canEdit }: props) {
  const handleDeleteImage = (imageUrl: string) => {
    // setUser((prev) => ({
    //   ...prev,
    //   images: prev.images.filter((img) => img !== imageUrl),
    // }))
  }

  return (
    <div className="w-full md:w-1/3">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 mb-4">
              <Image
                src={user?.profileImg || "/placeholder.svg"}
                alt={user?.fullName}
                fill
                className="rounded-full object-cover border-4 border-primary/20"
              />

              {
                canEdit &&
                <EditProfileImageDialog />
              }
            </div>

            <h2 className="text-2xl font-bold">{user?.fullName}</h2>
            <p className="text-muted-foreground">{user?.proffessionalDetails?.work}</p>
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
            {user?.images.map((image, index) => (
              <div key={index} className="relative group aspect-square">
                <ImageView image={image} />
                {
                  canEdit &&
                  <button
                    className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleDeleteImage(image)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                }
              </div>
            ))}

            {
              canEdit &&
              <AddImageDialog />
            }
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default ProfileSidebar
