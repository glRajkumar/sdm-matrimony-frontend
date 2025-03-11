"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

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
                src={user.profileImg || "/placeholder.svg"}
                alt={user.fullName}
                fill
                className="rounded-full object-cover border-4 border-primary/20"
              />

              {
                canEdit &&
                <EditProfileImageDialog user={user} onUpdate={handleUpdateUser} />
              }
            </div>

            <h2 className="text-2xl font-bold">{user.fullName}</h2>
            <p className="text-muted-foreground">{user.proffessionalDetails.work}</p>

            <div className="mt-4 w-full">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Profile Status</span>
                <span
                  className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    user.approvalStatus === "approved"
                      ? "bg-green-100 text-green-800"
                      : user.approvalStatus === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800",
                  )}
                >
                  {user.approvalStatus.charAt(0).toUpperCase() + user.approvalStatus.slice(1)}
                </span>
              </div>

              <Separator className="my-4" />

              <div className="space-y-3">
                <div>
                  <span className="text-sm text-muted-foreground">Email</span>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Mobile</span>
                  <p className="font-medium">{user.contactDetails.mobile}</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Date of Birth</span>
                  <p className="font-medium">{new Date(user.dob).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
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
            {user.images.map((image, index) => (
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
          </div>
        </CardContent>
      </Card>

      <AddImageDialog
        onAddImage={handleAddImage}
      />

      <ImageView
        selectedImage={selectedImage || ""}
        isImageViewOpen={isImageViewOpen}
        setIsImageViewOpen={setIsImageViewOpen}
      />
    </div>
  )
}

export default ProfileSidebar
