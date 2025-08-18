"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Mail, Lock, CreditCard, Loader, User, Phone } from "lucide-react";

import { useResendVerifyEmail, useUpdateEmail, useUpdateMobile } from "@/hooks/use-account";
import { useAccountInfo } from "@/hooks/use-user";
import useUserStore from "@/store/user";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import ConfirmUpdate from "./confirm-update";
import CardWrapper from "./card-wrapper";
import PlanDetails from "./plan-details";
import UpdatePass from "./update-pass";

function Page() {
  const mobile = useUserStore(s => s.mobile)
  const email = useUserStore(s => s.email)

  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [newMobile, setNewMobile] = useState(mobile)
  const [newEmail, setNewEmail] = useState(email)

  const { mutate: resendVerifyEmailMutate, isPending: isPending1 } = useResendVerifyEmail()
  const { mutate: mobileMutate, isPending: isMobilePending } = useUpdateMobile()
  const { mutate: emailMutate, isPending: isEmailPending } = useUpdateEmail()

  const { data: accountInfo, isLoading } = useAccountInfo()

  function updatePass() {
    setShowPasswordForm(p => !p)
  }

  return (
    <div className="max-w-2xl mx-auto space-y-10 py-20">
      <CardWrapper Icon={User} title="Account Information" description="Manage your account details and security settings">
        <div className="space-y-2">
          <div className="df">
            <Mail className="h-4 w-4" />
            <Label htmlFor="email" className="flex-1">
              Email Address
            </Label>

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

          <div className="relative">
            <Input
              id="email"
              type="email"
              value={newEmail}
              className="flex-1"
              onChange={e => setNewEmail(e.target.value)}
            />

            <ConfirmUpdate
              description={`email to ${newEmail}. You need to verify your new email agian even if you verified your old email.`}
              disabled={!newEmail || email === newEmail}
              isPending={isEmailPending}
              onConfirm={() => emailMutate({ email: newEmail })}
            />
          </div>

          {
            !!email &&
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

        <div className="space-y-2">
          <Label htmlFor="mobile" className="df mb-2">
            <Phone className="h-4 w-4" />
            Mobile
          </Label>

          <div className="relative">
            <Input
              id="mobile"
              type="tel"
              value={newMobile}
              className="flex-1"
              onChange={e => setNewMobile(e.target.value)}
            />
            <ConfirmUpdate
              description={`mobile to ${newMobile}`}
              disabled={!newMobile || newMobile === mobile}
              isPending={isMobilePending}
              onConfirm={() => mobileMutate({ mobile: newMobile })}
            />
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label className="df text-base font-medium">
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
