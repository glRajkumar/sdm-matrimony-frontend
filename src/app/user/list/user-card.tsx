"use client";

import { Heart, Eye, Briefcase, Calendar, HeartOff, UsersRound, Gem, GraduationCap, ShieldUser } from "lucide-react";
import Link from "next/link";

import { getAge } from "@/utils";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ToolTipWrapper } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { PlanBadge } from "@/components/common/plan-badge";

type props = {
  type?: "liked" | "disliked" | "full"
  isLiked?: boolean
  isDisliked?: boolean
  onView?: () => void
  onAdd?: (userId: string, type: "liked" | "disliked") => void
  onRemove?: (userId: string, type: "liked" | "disliked") => void
} & Partial<userT>

function UserCard({
  _id, profileImg, fullName, maritalStatus, dob,
  otherDetails, proffessionalDetails, currentPlan,
  type = "full", isLiked, isVerified,
  onView = () => { },
  onAdd = () => { },
  onRemove = () => { },
}: props) {
  const hasPlan = currentPlan && new Date(currentPlan.expiryDate).getTime() > new Date().getTime()
  return (
    <Card className="p-0 overflow-hidden transition-all duration-300 hover:shadow-md @container/card">
      <div className="flex flex-col @lg/card:flex-row">
        <div className="relative w-full @lg/card:w-auto">
          <img
            className="w-full @lg/card:w-60 h-60 object-cover"
            src={profileImg || "/imgs/user.jpg"}
            alt={fullName || "Profile Image"}
          />
          {isLiked && (
            <Badge variant="secondary" className="absolute top-2 right-2 bg-white/80">
              <Heart className="h-3 w-3 mr-1 fill-rose-500 text-rose-500" />
              Liked
            </Badge>
          )}
          {/* {isDisliked && (
            <Badge variant="secondary" className="absolute top-2 right-2 bg-white/80">
              <ThumbsDown className="h-3 w-3 mr-1 text-slate-500" />
              Disliked
            </Badge>
          )} */}

          <ToolTipWrapper description={`${hasPlan ? "Paid" : "Free"} User`}>
            <PlanBadge
              subscribedTo={hasPlan ? "platinum" : "basic"}
              className="p-2 absolute bottom-2 left-2 rounded-full [&>svg]:size-4 opacity-90"
            />
          </ToolTipWrapper>
        </div>

        <CardContent className="flex-1 px-4 py-3 relative">
          {isVerified && (
            <ToolTipWrapper description="Verified User">
              <Badge
                variant="secondary"
                className="p-1.5 absolute top-2 right-2 rounded-full bg-green-100 [&>svg]:size-4.5 opacity-90 border border-green-300"
              >
                <ShieldUser className="text-green-500" />
              </Badge>
            </ToolTipWrapper>
          )}
          <h3 className="text-lg font-semibold mb-1 line-clamp-1">{fullName}</h3>

          <div className="grid gap-2 text-sm text-muted-foreground mb-4">
            <div className="df">
              <Calendar className="h-4 w-4 opacity-70" />
              <span className="@xl/card:w-24">Age</span>
              <span className="@xl/card:w-4">:</span>
              <span className="font-medium">{dob ? getAge(dob) : ""} Yrs</span>
            </div>

            <div className="df">
              <UsersRound className="h-4 w-4 opacity-70" />
              <span className="@xl/card:w-24">Caste</span>
              <span className="@xl/card:w-4">:</span>
              <span className="font-medium">{otherDetails?.caste} {otherDetails?.subCaste ? `- ${otherDetails?.subCaste}` : ""}</span>
            </div>

            <div className="df">
              <GraduationCap className="h-4 w-4 opacity-70" />
              <span className="@xl/card:w-24">Qualification</span>
              <span className="@xl/card:w-4">:</span>
              <span className="font-medium">{proffessionalDetails?.highestQualification}</span>
            </div>

            <div className="df">
              <Briefcase className="h-4 w-4 opacity-70" />
              <span className="@xl/card:w-24">Profession</span>
              <span className="@xl/card:w-4">:</span>
              <span className="font-medium">{proffessionalDetails?.profession}</span>
            </div>

            <div className="df">
              <Gem className="h-4 w-4 opacity-70" />
              <span className="@xl/card:w-24">Marital Status</span>
              <span className="@xl/card:w-4">:</span>
              <span className="font-medium">{maritalStatus}</span>
            </div>
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

            {/* {(type === "full" || type === "liked") && !isDisliked &&
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
            } */}

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

            {/* {((type === "full" && isDisliked) || type === "disliked") &&
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
            } */}

            <ToolTipWrapper description="View Profile">
              <Button
                size="sm"
                onClick={onView}
                asChild
              >
                <Link href={`/user/profile/${_id}`}>
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View Profile</span>
                </Link>
              </Button>
            </ToolTipWrapper>
          </CardFooter>
        </CardContent>
      </div>
    </Card>
  )
}

export default UserCard
