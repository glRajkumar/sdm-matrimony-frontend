import { CheckCircle, Loader, LockKeyhole } from "lucide-react";
import { format } from "date-fns";
import Link from "next/link";

import { useCurrentPlan } from "@/hooks/use-user";

import { PlanBadge, planDetails, planPrices, profilesCount } from "@/components/common/plan-badge"
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function getAssistExpire(createdAt: string, till: number) {
  const expiryDate = new Date(createdAt)
  expiryDate.setMonth(expiryDate.getMonth() + till)
  return expiryDate
}

function FreePlan() {
  return (
    <div className="rounded-xl border-2">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-full bg-gray-50">
              <LockKeyhole className="h-6 w-6 text-gray-600" />
            </div>
            <div>
              <h3 className="font-semibold text-xl text-gray-600">
                Free Plan
              </h3>
              <p className="text-sm text-muted-foreground">Limited access</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-gray-600">
              Free
            </div>
            <Badge variant="outline" className="mt-1">
              Limited
            </Badge>
          </div>
        </div>

        <div className="space-y-2">
          {["Browse limited profiles", "Basic search filters", "No access to personal information"].map(
            (feature, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-600">
                <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                <span className="text-sm">{feature}</span>
              </div>
            ),
          )}
        </div>

        <div className="mt-4 pt-4 border-t">
          <Button
            size="lg"
            className="w-full bg-pink-600 hover:bg-pink-700"
            asChild
          >
            <Link href="/user/payment">
              Choose Your Plan - Start Your Journey
            </Link>
          </Button>

          <p className="text-xs text-center text-muted-foreground mt-2">
            Unlock full access to find your perfect match
          </p>
        </div>
      </div>
    </div>
  )
}

function PlanDetails() {
  const { data: currentPlan, isLoading } = useCurrentPlan()

  if (isLoading) return <div className="dc h-60"><Loader className="size-6 animate-spin" /></div>

  if (!currentPlan) return <FreePlan />

  const currentPlanDetails = planDetails[currentPlan?.subscribedTo]
  const assistedExpire = currentPlan?.assistedMonths ? getAssistExpire(currentPlan?.createdAt, currentPlan?.assistedMonths) : new Date()
  const addedProfiles = currentPlan?.noOfProfilesCanView === 999 ? 999 : currentPlan?.noOfProfilesCanView - profilesCount[currentPlan?.subscribedTo]
  const isPlanValid = currentPlan?.expiryDate ? new Date(currentPlan?.expiryDate).getTime() > Date.now() : true

  return (
    <>
      {
        !isPlanValid &&
        <div className="df justify-between">
          <p>Your current plan is expired</p>

          <Button asChild>
            <Link href="/user/payment">
              Buy Again
            </Link>
          </Button>
        </div>
      }

      <div className="rounded-xl border-2">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <PlanBadge
                subscribedTo={currentPlan?.subscribedTo}
                className="p-3 rounded-full [&>svg]:size-6"
              />
              <div>
                <h3 className={`font-semibold text-xl ${currentPlanDetails?.textColor}`}>
                  {currentPlanDetails?.name} Plan
                </h3>
                <p className="text-sm text-muted-foreground">{currentPlanDetails?.duration}</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${currentPlanDetails?.textColor}`}>
                ₹{planPrices[currentPlan?.subscribedTo].toLocaleString()}
              </div>

              {
                isPlanValid
                  ? <Badge variant="secondary" className="mt-1">
                    Active
                  </Badge>
                  : <Badge variant="destructive" className="mt-1">
                    Expired
                  </Badge>
              }
            </div>
          </div>

          <div className="space-y-2">
            {[
              `Unlock personal information of ${profilesCount[currentPlan?.subscribedTo]} profiles`,
              // "View personal information",
              // "Phone numbers & contact details"
            ].map(
              (feature, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm">{feature}</span>
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {
        (addedProfiles >= 50 || currentPlan?.isAssisted) &&
        <div className="space-y-4">
          <h4 className="font-medium">Additional Services</h4>

          {
            addedProfiles >= 50 &&
            <div className="p-4 rounded-lg border bg-muted/30">
              <p className="df mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="mr-auto font-medium">Additional Profile Access</span>

                {
                  isPlanValid
                    ? <Badge variant="outline">
                      Active
                    </Badge>
                    : <Badge variant="destructive">
                      Expired
                    </Badge>
                }
              </p>

              <p className="text-sm text-muted-foreground mb-2">
                Extended access to view more profiles beyond the chosen plan
              </p>

              <p className="df text-sm">
                <span>{currentPlan?.noOfProfilesCanView === 999 ? "Unlimited" : `+${addedProfiles}`} profiles</span>
                {currentPlan?.noOfProfilesCanView !== 999 && <span className=" text-gray-500">(Total {currentPlan?.noOfProfilesCanView} profiles)</span>}
                <span className="ml-auto text-lg font-semibold">₹{(currentPlan?.noOfProfilesCanView === 999 ? 20_000 : (addedProfiles / 50) * 1_000).toLocaleString()}</span>
              </p>
            </div>
          }

          {
            currentPlan?.isAssisted &&
            <div className="p-4 rounded-lg border bg-muted/30">
              <p className="df mb-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="mr-auto font-medium">Assisted Services</span>

                {
                  assistedExpire?.getTime() > Date.now()
                    ? <Badge variant="outline">
                      Active
                    </Badge>
                    : <Badge variant="destructive">
                      Expired
                    </Badge>
                }
              </p>

              <p className="text-sm text-muted-foreground mb-2">
                Personalized assistance from our relationship experts
              </p>

              <p className="df text-sm">
                <span>{currentPlan?.assistedMonths} months</span>
                <span className="mr-auto text-gray-500">(Expiring on: {format(assistedExpire, "dd MMM yyyy")})</span>
                <span className="text-lg font-semibold">₹{(currentPlan?.assistedMonths * 10_000).toLocaleString()}</span>
              </p>
            </div>
          }
        </div>
      }

      <Separator />

      <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-green-800">Total Plan Value</h4>
            <p className="text-sm font-semibold text-green-600">Valid until {format(currentPlan?.expiryDate, "dd MMM yyyy")}</p>
          </div>

          <div className="text-2xl font-bold text-green-800 text-right">₹{currentPlan?.amount.toLocaleString()}</div>
        </div>
      </div>

      <Separator />

      <div className="text-sm text-center">
        {currentPlan?.unlockedCount} profiles unlocked. To view unlocked profiles, <Link className="text-pink-500 hover:text-pink-600" href="/user/unlocked">click here</Link>
      </div>
    </>
  )
}

export default PlanDetails
