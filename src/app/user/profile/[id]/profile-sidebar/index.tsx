"use client";

import { useState } from "react";
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [isImageViewOpen, setIsImageViewOpen] = useState(false)

  const handleUpdateUser = (updatedData: Partial<userT>) => {
    // setUser((prev) => ({ ...prev, ...updatedData }))
  }

  const handleDeleteImage = (imageUrl: string) => {
    // setUser((prev) => ({
    //   ...prev,
    //   images: prev.images.filter((img) => img !== imageUrl),
    // }))
  }

  const handleAddImage = (imageUrl: string) => {
    // setUser((prev) => ({
    //   ...prev,
    //   images: [...prev.images, imageUrl],
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
                <EditProfileImageDialog user={user} onUpdate={handleUpdateUser} />
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
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover rounded-md cursor-pointer"
                  onClick={() => {
                    setSelectedImage(image)
                    setIsImageViewOpen(true)
                  }}
                />
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
              <AddImageDialog
                onAddImage={handleAddImage}
              />
            }
          </div>
        </CardContent>
      </Card>

      <ImageView
        selectedImage={selectedImage || ""}
        isImageViewOpen={isImageViewOpen}
        setIsImageViewOpen={setIsImageViewOpen}
      />
    </div>
  )
}

export default ProfileSidebar
