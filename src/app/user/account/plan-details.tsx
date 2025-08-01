import { CheckCircle, LockKeyhole } from "lucide-react";

import { PlanBadge, planDetails, planPrices } from "@/components/common/plan-badge"
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format } from "date-fns";

type props = {
  currentPlan: currentPlanT | undefined
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

function PlanDetails({ currentPlan }: props) {
  if (!currentPlan) return <FreePlan />

  const currentPlanDetails = planDetails[currentPlan.subscribedTo]

  return (
    <>
      <div className="rounded-xl border-2">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <PlanBadge
                subscribedTo={currentPlan.subscribedTo}
                className="p-3 rounded-full [&>svg]:size-6"
              />
              <div>
                <h3 className={`font-semibold text-xl ${currentPlanDetails.textColor}`}>
                  {currentPlanDetails.name} Plan
                </h3>
                <p className="text-sm text-muted-foreground">{currentPlanDetails.duration}</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-2xl font-bold ${currentPlanDetails.textColor}`}>
                ₹{planPrices[currentPlan.subscribedTo].toLocaleString()}
              </div>
              <Badge variant="secondary" className="mt-1">
                Active
              </Badge>
            </div>
          </div>

          <div className="space-y-2">
            {["Access to 50 profiles", "View personal information", "Phone numbers & contact details"].map(
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
        (currentPlan.noOfProfilesCanView > 50 || currentPlan.isAssisted) &&
        <div className="space-y-4">
          <h4 className="font-medium">Additional Services</h4>

          {
            currentPlan.noOfProfilesCanView > 50 &&
            <div className="p-4 rounded-lg border bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Additional Profile Access</span>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-2">
                Extended access to view more profiles beyond the basic 50
              </p>
              <div className="text-sm">
                <p className="font-medium">Current Access: </p>
                <p className="df justify-between">
                  <span>{currentPlan.noOfProfilesCanView === 999 ? "Unlimited" : `Basic 50 + ${currentPlan.noOfProfilesCanView - 50}`} profiles</span>
                  <span className="text-lg font-semibold">₹{(currentPlan.noOfProfilesCanView === 999 ? 20_000 : ((currentPlan.noOfProfilesCanView - 50) / 50) * 1_000).toLocaleString()}</span>
                </p>
              </div>
            </div>
          }

          {
            currentPlan.isAssisted &&
            <div className="p-4 rounded-lg border bg-muted/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="font-medium">Assisted Services</span>
                </div>
                <Badge variant="outline">Active</Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-2">
                Personalized assistance from our relationship experts
              </p>
              <div className="text-sm">
                <p className="font-medium">Duration: </p>
                <p className="df justify-between">
                  <span>{currentPlan.assistedMonths} months</span>
                  <span className="text-lg font-semibold">₹{(currentPlan.assistedMonths * 10_000).toLocaleString()}</span>
                </p>
              </div>
            </div>
          }
        </div>
      }

      <Separator />

      <div className="p-4 rounded-lg bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-green-800">Total Plan Value</h4>
            <p className="text-sm font-semibold text-green-600">Valid until {format(currentPlan.expiryDate, "dd MMM yyyy")}</p>
          </div>

          <div className="text-2xl font-bold text-green-800 text-right">₹{currentPlan.amount.toLocaleString()}</div>
        </div>
      </div>
    </>
  )
}

export default PlanDetails
