import { useState } from "react"
import { Loader } from "lucide-react"
import { toast } from "sonner"

import { assistedPrices, extraProfiles, PlanBadge, planDetails, planPrices, planValidityMonths, profilesCount } from "@/components/common/plan-badge"
import { useMakePaymentForUser } from "@/hooks/use-super-admin"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

import FindUser from "./find-user"

function MakePaymentForUser() {
  const [additionalProfilesCount, setAdditionalProfilesCount] = useState(10)
  const [addAdditionalProfiles, setAddAdditionalProfiles] = useState(false)
  const [assistedMonths, setAssistedMonths] = useState(1)
  const [subscribedTo, setSubscribedTo] = useState<subscribedToT>("basic")
  const [isAssisted, setIsAssisted] = useState(false)
  const [key, setKey] = useState(0)
  const [_id, setId] = useState("")

  const { mutate, isPending } = useMakePaymentForUser()

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

  const handlePayment = async () => {
    if (!_id) return toast.error("Choose user first")

    const noOfProfilesCanView = !addAdditionalProfiles
      ? profilesCount[subscribedTo]
      : additionalProfilesCount === 999
        ? additionalProfilesCount
        : additionalProfilesCount + profilesCount[subscribedTo]

    const payload = {
      _id,
      isAssisted,
      subscribedTo,
      assistedMonths,
      noOfProfilesCanView,
      amount: finalAmount,
    }

    mutate(payload, {
      onSuccess() {
        setAdditionalProfilesCount(10)
        setAddAdditionalProfiles(false)
        setAssistedMonths(1)
        setSubscribedTo("basic")
        setIsAssisted(false)
        setKey(p => p + 1)
        setId("")
      }
    })
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <FindUser
          key={key}
          selected={_id || ""}
          setSelected={setId}
        />

        <Card>
          <CardContent>
            <RadioGroup value={subscribedTo} onValueChange={(value) => setSubscribedTo(value as subscribedToT)}>
              <div className="grid gap-4">
                {Object.entries(planDetails).map(([key, plan]) => {
                  const isSelected = subscribedTo === key
                  return (
                    <div
                      key={key}
                      className={`relative rounded-xl border transition-all cursor-pointer ${isSelected
                        ? "border-pink-500 bg-linear-to-r from-pink-50 to-pink-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                        }`}
                    >
                      <Label htmlFor={key} className="cursor-pointer block">
                        <div className="flex items-center justify-between p-4">
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

            <div className="mb-1 mt-6 text-sm text-gray-600">Get personalized assistance from our relationship experts</div>

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

          <CardFooter>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button
                  size="lg"
                  className="w-full bg-pink-600 hover:bg-pink-700"
                  disabled={!_id}
                >
                  Proceed
                </Button>
              </AlertDialogTrigger>

              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                  <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>

                  <AlertDialogAction asChild>
                    <Button
                      onClick={handlePayment}
                      disabled={isPending}
                    >
                      {isPending && <Loader className="animate-spin" />}
                      Proceed to Payment - ₹{finalAmount.toLocaleString()}
                    </Button>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default MakePaymentForUser
