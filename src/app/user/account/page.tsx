"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Mail, Lock, CreditCard, Loader } from "lucide-react";

import { useResendVerifyEmail } from "@/hooks/use-account";
import { useAccountInfo } from "@/hooks/use-user";
import useUserStore from "@/store/user";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import CardWrapper from "./card-wrapper";
import PlanDetails from "./plan-details";
import UpdatePass from "./update-pass";

function Page() {
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const email = useUserStore(s => s.email)

  const { data: accountInfo, isLoading } = useAccountInfo()
  const { mutate: resendVerifyEmailMutate, isPending: isPending1 } = useResendVerifyEmail()

  function updatePass() {
    setShowPasswordForm(p => !p)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-10 py-20">
      <CardWrapper Icon={Mail} title="Account Information" description="Manage your account details and security settings">
        <div className="space-y-2">
          <div className="df justify-between">
            <Label htmlFor="email">Email Address</Label>

            {
              isLoading
                ? <Loader className="h-4 w-4 animate-spin" />
                :
                <Badge
                  variant={accountInfo?.isVerified ? "default" : "destructive"}
                  className="flex items-center gap-1"
                >
                  {accountInfo?.isVerified ? (
                    <>
                      <CheckCircle className="h-3 w-3" />
                      Verified
                    </>
                  ) : (
                    <>
                      <XCircle className="h-3 w-3" />
                      Not Verified
                    </>
                  )}
                </Badge>
            }
          </div>

          <Input
            id="email"
            type="email"
            value={email}
            className="flex-1"
            disabled
          />

          {
            !isLoading &&
            !accountInfo?.isVerified && (
              <Button
                size="sm"
                variant="outline"
                className="mt-2 bg-transparent"
                onClick={() => resendVerifyEmailMutate({ email })}
                disabled={isPending1}
              >
                {isPending1 && <Loader className="h-4 w-4 animate-spin" />}
                Send Verification Email
              </Button>
            )
          }
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="text-base font-medium flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Password
              </Label>

              <p className="text-sm text-muted-foreground">Update your password to keep your account secure</p>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={updatePass}
            >
              {showPasswordForm ? "Cancel" : "Change Password"}
            </Button>
          </div>

          {
            showPasswordForm &&
            <UpdatePass onSuccess={updatePass} />
          }
        </div>
      </CardWrapper>

      <CardWrapper
        Icon={CreditCard}
        title="Current Plan"
        description="Your subscription details and included features"
      >
        {
          isLoading
            ? <div className="dc h-60"><Loader className="size-6 animate-spin" /></div>
            : <PlanDetails
              currentPlan={accountInfo?.currentPlan}
              unlockedCount={accountInfo?.unlockedCount || 0}
            />
        }
      </CardWrapper>
    </div>
  )
}

export default Page
