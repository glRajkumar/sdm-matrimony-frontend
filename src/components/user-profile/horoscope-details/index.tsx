
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import ChartDisplay from "./chart-display";
import Edit from "./edit";

type props = {
  user: userT
  canEdit: boolean
}

function HoroscopeDetails({ user, canEdit }: props) {
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
            <p className="font-medium">{user?.vedicHoroscope?.nakshatra || "---"}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Rasi</span>
            <p className="font-medium">{user?.vedicHoroscope?.rasi || "---"}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Lagna</span>
            <p className="font-medium">{user?.vedicHoroscope?.lagna || "---"}</p>
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Dasha Period</span>
            <p className="font-medium">{user?.vedicHoroscope?.dashaPeriod || "---"}</p>
          </div>
        </div>

        {
          user?.vedicHoroscope?.vedicHoroscopePic &&
          <div>
            <span className="text-sm text-muted-foreground">Vedic Horoscope Picture</span>
            <div className="dc p-4 rounded border">
              <img
                src={user?.vedicHoroscope?.vedicHoroscopePic}
                alt="Vedic Horoscope"
                className="h-80"
              />
            </div>
          </div>
        }

        {/* <Tabs defaultValue="raasi">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="raasi">Raasi Chart</TabsTrigger>
            <TabsTrigger value="navamsa">Navamsa Chart</TabsTrigger>
          </TabsList>
          <TabsContent value="raasi" className="mt-4">
            <ChartDisplay chart={user?.vedicHoroscope?.raasiChart} />
          </TabsContent>
          <TabsContent value="navamsa" className="mt-4">
            <ChartDisplay chart={user?.vedicHoroscope?.navamsaChart} />
          </TabsContent>
        </Tabs> */}
      </CardContent>
    </Card>
  )
}

export default HoroscopeDetails
