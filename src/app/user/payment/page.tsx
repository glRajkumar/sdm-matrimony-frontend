"use client";

import { useState } from "react";
import { Check, Users, Loader } from "lucide-react";

import { useCreateOrder, useVerifyPayment } from "@/hooks/use-payment";;
import { useUserDetailsMini } from "@/hooks/use-account";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { PlanBadge, planDetails, planPrices, profilesCount } from "@/components/common/plan-badge";
import Script from "next/script";

function Page() {
  const { data: user, isLoading } = useUserDetailsMini()

  const [additionalProfilesCount, setAdditionalProfilesCount] = useState(50)
  const [addAdditionalProfiles, setAddAdditionalProfiles] = useState(false)
  const [assistedMonths, setAssistedMonths] = useState(1)
  const [subscribedTo, setSubscribedTo] = useState<subscribedToT>("basic")
  const [isAssisted, setIsAssisted] = useState(false)

  const { mutateAsync: createOrderMutate, isPending: isCreateOrderPending } = useCreateOrder()
  const { mutate: verifyPaymentMutate, isPending: isVerifyPaymentPending } = useVerifyPayment()

  const getProfileOptions = () => {
    const options = []
    for (let i = 50; i <= 250; i += 50) {
      options.push({ value: i, label: `${i}` })
    }
    options.push({ value: 999, label: "Unlimited" })
    return options
  }

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

    const contact = user?.contactDetails?.mobile || ""

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
      amount: 1000,
      currency: data.currency,
      name: 'SD Matrimony',
      description: 'Unlock user informations',
      order_id: data.id,
      notes: payload,
      prefill: {
        name: user?.fullName || "",
        email: user?.email || "",
        contact: contact ? "+91" + contact : "",
      },
      handler: (res: any) => {
        verifyPaymentMutate({
          amount: data.amount / 100,
          ...payload,
          paymentId: res.razorpay_payment_id,
          orderId: data.id,
          razorpayPaymentSignature: res.razorpay_signature,
        })
      },
    }

    const rzp = new (window as any).Razorpay(options)
    rzp.open()
  }

  function getProfileLabel(option: { value: number; label: string }) {
    if (option.value === 999) return "Unlimited profiles" + " (+₹20,000)"
    return `+${option.value} profiles (+₹${(option.value / 50) * 1_000})`
  }

  let finalAmount = planPrices[subscribedTo]

  if (addAdditionalProfiles) {
    if (additionalProfilesCount === 999) {
      // Unlimited
      finalAmount += 20_000
    } else {
      finalAmount += (additionalProfilesCount / 50) * 1_000
    }
  }

  if (isAssisted) {
    finalAmount += assistedMonths * 10_000
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
                  Expand your reach with more profile views (₹1,000 per additional 50 profiles)
                </div>

                <div className="df flex-wrap">
                  <Checkbox
                    id="additional-profile-access"
                    checked={addAdditionalProfiles}
                    onCheckedChange={(value) => setAddAdditionalProfiles(value as boolean)}
                  />

                  <Label htmlFor="additional-profile-access" className="mr-auto text-base font-medium shrink-0">
                    Additional Profile Access
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
                        {getProfileOptions().map((option) => (
                          <SelectItem key={option.value} value={option.value.toString()}>
                            {getProfileLabel(option)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  }
                </div>

                <div className="mb-6">
                </div>

                <div className="mb-1 text-sm text-gray-600">Get personalized assistance from our relationship experts (₹10,000 per month)</div>

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
                        {[1, 2, 3, 4, 5, 6].map((month) => (
                          <SelectItem key={month} value={month.toString()}>
                            {month} month{month > 1 ? "s" : ""} (+₹{Number(month * 10_000).toLocaleString()})
                          </SelectItem>
                        ))}
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
                    <span className="font-semibold">+ ₹{(additionalProfilesCount === 999 ? 20_000 : (additionalProfilesCount / 50) * 1_000).toLocaleString()}</span>
                  </div>
                }

                {isAssisted && (
                  <div className="flex justify-between text-sm">
                    <p>Assisted Services <span className="text-xs capitalize text-gray-500">( {assistedMonths} month{assistedMonths > 1 ? "s" : ""} )</span></p>
                    <span className="font-semibold">+ ₹{(assistedMonths * 10_000).toLocaleString()}</span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between font-semibold text-lg">
                  <span>Total Amount</span>
                  <span className="text-pink-600 font-bold">₹{finalAmount.toLocaleString()}</span>
                </div>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>• Profile access : {addAdditionalProfiles ? additionalProfilesCount === 999 ? "Unlimited" : additionalProfilesCount + profilesCount[subscribedTo] : profilesCount[subscribedTo]} profiles</p>
                  <p>• Assisted services : {isAssisted ? `${assistedMonths} month${assistedMonths > 1 ? "s" : ""}` : "Not opted"}</p>
                </div>
              </CardContent>

              <CardFooter>
                <Button
                  size="lg"
                  className="w-full bg-pink-600 hover:bg-pink-700"
                  onClick={handlePayment}
                  disabled={isCreateOrderPending || isVerifyPaymentPending || isLoading}
                >
                  {(isCreateOrderPending || isVerifyPaymentPending) && <Loader className="animate-spin" />}
                  Proceed to Payment - ₹{finalAmount.toLocaleString()}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="beforeInteractive"
      />
    </div>
  )
}

export default Page
