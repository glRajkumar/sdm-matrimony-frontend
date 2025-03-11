"use client";

import { Heart, Eye, Briefcase, User, Calendar, ThumbsDown, HeartOff } from "lucide-react";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ToolTipWrapper } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type props = {
  type?: "liked" | "disliked" | "full"
  isLiked?: boolean
  isDisliked?: boolean
  onView?: () => void
  onAdd?: (userId: string, type: "liked" | "disliked") => void
  onRemove?: (userId: string, type: "liked" | "disliked") => void
} & Partial<userT>

function UserCard({
  _id, profileImg, fullName, maritalStatus,
  proffessionalDetails, otherDetails,
  type = "full", isLiked, isDisliked,
  onView = () => { },
  onAdd = () => { },
  onRemove = () => { },
}: props) {
  return (
    <Card className="mb-6 p-0 overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-auto">
          <img
            className="w-full sm:w-60 h-60 object-cover"
            src={profileImg || "/placeholder.svg?height=160&width=160"}
            alt={fullName || "Profile Image"}
          />
          {isLiked && (
            <Badge variant="secondary" className="absolute top-2 right-2 bg-white/80">
              <Heart className="h-3 w-3 mr-1 fill-rose-500 text-rose-500" />
              Liked
            </Badge>
          )}
          {isDisliked && (
            <Badge variant="secondary" className="absolute top-2 right-2 bg-white/80">
              <ThumbsDown className="h-3 w-3 mr-1 text-slate-500" />
              Disliked
            </Badge>
          )}
        </div>

        <CardContent className="flex-1 p-4">
          <h3 className="text-lg font-semibold mb-1">{fullName}</h3>

          <div className="grid gap-2 text-sm text-muted-foreground mb-4">
            {otherDetails?.caste && (
              <div className="df">
                <User className="h-4 w-4 opacity-70" />
                <span>{otherDetails.caste}</span>
              </div>
            )}

            {proffessionalDetails?.salary && (
              <div className="df">
                <Briefcase className="h-4 w-4 opacity-70" />
                <span>₹ {proffessionalDetails.salary.toLocaleString()} / per month</span>
              </div>
            )}

            {maritalStatus && (
              <div className="df">
                <Calendar className="h-4 w-4 opacity-70" />
                <span>{maritalStatus}</span>
              </div>
            )}
          </div>

          <CardFooter className="df flex-wrap p-0">
            {(type === "full" || type === "disliked") && !isLiked &&
              <ToolTipWrapper description="Add to Like">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAdd(_id as string, "liked")}
                  className="text-rose-500 border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                >
                  <Heart className="h-4 w-4" />
                  <span className="sr-only">Add to Like</span>
                </Button>
              </ToolTipWrapper>
            }

            {(type === "full" || type === "liked") && !isDisliked &&
              <ToolTipWrapper description="Add to Dislike">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAdd(_id as string, "disliked")}
                  className="text-blue-500 border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span className="sr-only">Add to Dislike</span>
                </Button>
              </ToolTipWrapper>
            }

            {((type === "full" && isLiked) || type === "liked") &&
              <ToolTipWrapper description="Remove from Like">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRemove(_id as string, "liked")}
                  className="text-rose-500 border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                >
                  <HeartOff className="h-4 w-4 fill-rose-500" />
                  <span className="sr-only">Remove from Like</span>
                </Button>
              </ToolTipWrapper>
            }

            {((type === "full" && isDisliked) || type === "disliked") &&
              <ToolTipWrapper description="Remove from Dislike">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onRemove(_id as string, "disliked")}
                  className="text-blue-500 border-blue-200 hover:bg-blue-50 hover:text-blue-600 relative"
                >
                  <ThumbsDown className="h-4 w-4" />
                  <span className="sr-only">Remove from Dislike</span>
                  <span className="absolute top-0.5 right-4 w-px h-[22px] bg-blue-500 rounded-full -rotate-45"></span>
                </Button>
              </ToolTipWrapper>
            }

            <ToolTipWrapper description="View Profile">
              <Button
                size="sm"
                onClick={onView}
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">View Profile</span>
              </Button>
            </ToolTipWrapper>
          </CardFooter>
        </CardContent>
      </div>
    </Card>
  )
}

export default UserCard
