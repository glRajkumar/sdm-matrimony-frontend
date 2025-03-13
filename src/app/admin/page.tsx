
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Users from "./users";

function Page() {
  return (
    <section className="px-2 sm:px-4 py-8">
      <Tabs defaultValue="pending">
        <TabsList className="w-full mb-4 border-b bg-transparent rounded-none">
          <TabsTrigger className="px-4 pb-2 -mb-1 border-b-2 border-transparent data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none" value="pending">Pending</TabsTrigger>
          <TabsTrigger className="px-4 pb-2 -mb-1 border-b-2 border-transparent data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none" value="approved">Approved</TabsTrigger>
          <TabsTrigger className="px-4 pb-2 -mb-1 border-b-2 border-transparent data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none" value="rejected">Rejected</TabsTrigger>
          <TabsTrigger className="px-4 pb-2 -mb-1 border-b-2 border-transparent data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none" value="blocked">Blocked</TabsTrigger>
          <TabsTrigger className="px-4 pb-2 -mb-1 border-b-2 border-transparent data-[state=active]:border-primary rounded-none data-[state=active]:shadow-none" value="deleted">Deleted</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Users approvalStatus="pending" />
        </TabsContent>

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
