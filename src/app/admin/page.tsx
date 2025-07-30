
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Users from "./users";

function Page() {
  return (
    <section className="px-2 sm:px-4 py-8">
      <Tabs defaultValue="approved">
        <TabsList className="w-full mb-4 border-b bg-transparent rounded-none">
          {
            ["approved", "rejected", "blocked", "deleted"].map((tab) => (
              <TabsTrigger
                key={tab}
                className="px-4 pb-2 -mb-1.5 capitalize border-0 border-b-2 data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none"
                value={tab}
              >
                {tab}
              </TabsTrigger>
            ))
          }
        </TabsList>

        <TabsContent value="approved">
          <Users approvalStatus="approved" />
        </TabsContent>

        <TabsContent value="rejected">
          <Users approvalStatus="rejected" />
        </TabsContent>

        <TabsContent value="blocked">
          <Users isBlocked />
        </TabsContent>

        <TabsContent value="deleted">
          <Users isDeleted />
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default Page
