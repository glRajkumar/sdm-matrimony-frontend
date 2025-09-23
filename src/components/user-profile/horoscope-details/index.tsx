"use client";

import { nakshatraMap, raasiMap } from "@/utils";
import useUnlock from "../contact-details/use-unlock";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import UpgradeBtn from "../contact-details/upgrade-btn";
import VerdicPic from "./verdic-pic";
import Edit from "./edit";

type props = {
  user: userT
  canEdit: boolean
}

function getValue(val: string, map: Record<string, string>) {
  return val ? val + (map[val] ? ` (${map[val]})` : "") : "---"
}

function HoroscopeDetails({ user, canEdit }: props) {
  const { isPending, unlockBtnClk } = useUnlock()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Vedic Horoscope</CardTitle>
          <CardDescription>Your astrological information</CardDescription>
        </div>

        {
          canEdit &&
          <Edit user={user} />
        }
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <span className="text-sm text-muted-foreground">Nakshatra</span>
            <UpgradeBtn
              value={getValue(user?.vedicHoroscope?.nakshatra, nakshatraMap)}
              unlocked={!!user?.contactDetails}
              isPending={isPending}
              unlockBtnClk={() => unlockBtnClk(user._id)}
            />
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Rasi</span>
            <UpgradeBtn
              value={getValue(user?.vedicHoroscope?.rasi, raasiMap)}
              unlocked={!!user?.contactDetails}
              isPending={isPending}
              unlockBtnClk={() => unlockBtnClk(user._id)}
            />
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Lagna</span>
            <UpgradeBtn
              value={getValue(user?.vedicHoroscope?.lagna, raasiMap)}
              unlocked={!!user?.contactDetails}
              isPending={isPending}
              unlockBtnClk={() => unlockBtnClk(user._id)}
            />
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Dasha Period</span>
            <p className="font-medium">{user?.vedicHoroscope?.dashaPeriod || "---"}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Dosham</span>
            <p className="font-medium">{user?.vedicHoroscope?.dosham || "---"}</p>
          </div>
        </div>

        <div>
          <span className="text-sm text-muted-foreground">Vedic Horoscope Picture</span>
          <VerdicPic
            user={user}
            isPending={isPending}
            unlockBtnClk={unlockBtnClk}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default HoroscopeDetails
