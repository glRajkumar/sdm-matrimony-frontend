"use client";

import { useState } from "react";
import { Check, Users, Loader } from "lucide-react";
import Script from "next/script";

import { useCreateOrder, useVerifyPayment } from "@/hooks/use-payment";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { assistedPrices, extraProfiles, PlanBadge, planDetails, planPrices, planValidityMonths, profilesCount } from "@/components/common/plan-badge";

type props = {
  showCheckout?: boolean
}

function Checkout({ showCheckout = true }: props) {
  const [additionalProfilesCount, setAdditionalProfilesCount] = useState(10)
  const [addAdditionalProfiles, setAddAdditionalProfiles] = useState(false)
  const [assistedMonths, setAssistedMonths] = useState(1)
  const [subscribedTo, setSubscribedTo] = useState<subscribedToT>("basic")
  const [isAssisted, setIsAssisted] = useState(false)

  const { mutateAsync: createOrderMutate, isPending: isCreateOrderPending } = useCreateOrder()
  const { mutate: verifyPaymentMutate, isPending: isVerifyPaymentPending } = useVerifyPayment()

  const handlePayment = async () => {
    const noOfProfilesCanView = !addAdditionalProfiles
      ? profilesCount[subscribedTo]
      : additionalProfilesCount === 999
        ? additionalProfilesCount
        : additionalProfilesCount + profilesCount[subscribedTo]

    const payload = {
      subscribedTo,
      noOfProfilesCanView,
      isAssisted,
      assistedMonths,
    }
    const data = await createOrderMutate(payload)

    if ((window as any)?.PhonePeCheckout) {
      (window as any)?.PhonePeCheckout?.transact?.({
        tokenUrl: data?.redirectUrl,
        type: "IFRAME",
        callback(res: string) {
          if (res === "CONCLUDED") {
            verifyPaymentMutate({
              ...payload,
              amount: data.amount,
              orderId: data.orderId,
              merchantOrderId: data.merchantOrderId,
            })
          }
        },
      })
    }
  }

  let finalAmount = planPrices[subscribedTo]

  if (addAdditionalProfiles) {
    if (additionalProfilesCount === 999) {
      finalAmount += extraProfiles[999]
      // Unlimited
    } else {
      finalAmount += extraProfiles[additionalProfilesCount]
    }
  }

  if (isAssisted) {
    finalAmount += assistedPrices[assistedMonths]
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 px-8 py-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <img
              src="/logos/logo-512.webp"
              width={80}
              height={80}
              alt='SDM-logo'
            />
            <h1 className="text-3xl font-bold text-gray-900">Find Your Perfect Match</h1>
          </div>

          <div className="text-gray-600 text-lg">Choose the plan that's right for your journey to love</div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Select Your Plan
                </CardTitle>
                <CardDescription>
                  Choose from our carefully crafted plans designed to help you find your soulmate
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup value={subscribedTo} onValueChange={(value) => setSubscribedTo(value as subscribedToT)}>
                  <div className="grid gap-4">
                    {Object.entries(planDetails).map(([key, plan]) => {
                      const isSelected = subscribedTo === key
                      return (
                        <div
                          key={key}
                          className={`relative rounded-xl border transition-all cursor-pointer ${isSelected
                            ? "border-pink-500 bg-gradient-to-r from-pink-50 to-pink-50 shadow-md"
                            : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                            }`}
                        >
                          <Label htmlFor={key} className="cursor-pointer block">
                            <div className="p-6">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <PlanBadge
                                    className="p-3 rounded-full [&>svg]:size-6"
                                    subscribedTo={key as subscribedToT}
                                  />
                                  <div>
                                    <h3 className="font-semibold text-xl text-gray-900">{plan.name}</h3>
                                    <p className="text-sm text-gray-500">{plan.duration}</p>
                                  </div>
                                </div>

                                <div className="text-right">
                                  <div className="text-2xl font-bold text-gray-900">
                                    ₹{planPrices[key as subscribedToT].toLocaleString()}
                                  </div>
                                  <RadioGroupItem value={key} id={key} className="mt-2" />
                                </div>
                              </div>
                              <div className="space-y-2">
                                {[
                                  `Unlock personal information of ${profilesCount[key as subscribedToT]} profiles`,
                                  // "View user information",
                                  // "Phone numbers & contact details"
                                ].map((feature, index) => (
                                  <div key={index} className="flex items-center gap-2 text-gray-600">
                                    <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                                    <span className="text-sm">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </Label>
                        </div>
                      )
                    })}
                  </div>
                </RadioGroup>

                <Separator className="my-6" />

                <div className="mb-1 text-sm text-gray-600">
                  Get full access to more profiles
                </div>

                <div className="df flex-wrap">
                  <Checkbox
                    id="additional-profile-access"
                    checked={addAdditionalProfiles}
                    onCheckedChange={(value) => setAddAdditionalProfiles(value as boolean)}
                  />

                  <Label htmlFor="additional-profile-access" className="mr-auto text-base font-medium shrink-0">
                    Additional Unlock Profiles
                  </Label>

                  {
                    addAdditionalProfiles &&
                    <Select
                      value={additionalProfilesCount.toString()}
                      onValueChange={(value) => setAdditionalProfilesCount(Number.parseInt(value))}
                    >
                      <SelectTrigger className="w-60" size="sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          Object.entries(extraProfiles).map(([key, price]) => (
                            <SelectItem key={key} value={key}>
                              {`${Number(key) === 999 ? "Unlimited" : `+${key}`} profiles (+${price?.toLocaleString()})`}
                            </SelectItem>
                          ))
                        }
                      </SelectContent>
                    </Select>
                  }
                </div>

                <div className="mb-6">
                </div>

                <div className="mb-1 text-sm text-gray-600">Get personalized assistance from our relationship experts</div>

                <div className="df flex-wrap">
                  <Checkbox id="assisted" checked={isAssisted} onCheckedChange={(value) => setIsAssisted(value as boolean)} />
                  <Label htmlFor="assisted" className="mr-auto text-base font-medium shrink-0">
                    Assisted Services
                  </Label>

                  {isAssisted && (
                    <Select
                      value={assistedMonths.toString()}
                      onValueChange={(value) => setAssistedMonths(Number.parseInt(value))}
                    >
                      <SelectTrigger className="w-48" size="sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {
                          Object.entries(assistedPrices)
                            .filter(([month]) => +month <= planValidityMonths[subscribedTo])
                            .map(([month, price]) => (
                              <SelectItem key={month} value={month.toString()}>
                                {month} month{+month > 1 ? "s" : ""} (+₹{price?.toLocaleString()})
                              </SelectItem>
                            ))
                        }
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="mt-8 text-xs text-gray-500">
                  Note: Assisted services expire is different from plan expiry. For example, if you buy a 3 month plan with 2 months assisted services, then your plan will expire in 3 months but assisted services will expire in 2 months.
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="sticky top-28">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <p>{planDetails[subscribedTo].name} Plan <span className="text-xs capitalize text-gray-500">( {planDetails[subscribedTo].duration} - {profilesCount[subscribedTo]} profiles )</span></p>
                  <span className="font-semibold">₹{planPrices[subscribedTo].toLocaleString()}</span>
                </div>

                {
                  addAdditionalProfiles &&
                  <div className="flex justify-between text-sm">
                    <p>Additional Profiles <span className="text-xs capitalize text-gray-500">( {additionalProfilesCount === 999 ? " Unlimited" : ` +${additionalProfilesCount}`} )</span></p>
                    <span className="font-semibold">+ ₹{(extraProfiles[additionalProfilesCount]).toLocaleString()}</span>
                  </div>
                }

                {isAssisted && (
                  <div className="flex justify-between text-sm">
                    <p>Assisted Services <span className="text-xs capitalize text-gray-500">( {assistedMonths} month{assistedMonths > 1 ? "s" : ""} )</span></p>
                    <span className="font-semibold">+ ₹{(assistedPrices[assistedMonths]).toLocaleString()}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount</span>
                  <span className="text-pink-600 font-bold">₹{finalAmount.toLocaleString()}</span>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Additional Unlock Profiles : {addAdditionalProfiles ? additionalProfilesCount === 999 ? "Unlimited" : additionalProfilesCount + profilesCount[subscribedTo] : profilesCount[subscribedTo]} profiles</p>
                  <p>• Assisted services : {isAssisted ? `${assistedMonths} month${assistedMonths > 1 ? "s" : ""}` : "Not opted"}</p>
                </div>
              </CardContent>

              {
                showCheckout &&
                <CardFooter>
                  <Button
                    size="lg"
                    className="w-full bg-pink-600 hover:bg-pink-700"
                    onClick={handlePayment}
                    disabled={isCreateOrderPending || isVerifyPaymentPending}
                  >
                    {(isCreateOrderPending || isVerifyPaymentPending) && <Loader className="animate-spin" />}
                    Proceed to Payment - ₹{finalAmount.toLocaleString()}
                  </Button>
                </CardFooter>
              }
            </Card>
          </div>
        </div>
      </div>

      {
        showCheckout &&
        <Script
          src="https://mercury.phonepe.com/web/bundle/checkout.js"
        />
      }
    </div>
  )
}

export default Checkout
