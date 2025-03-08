import { CardContent, Card } from "@/components/ui/card";

function Layout({ children }: readOnlyChildren) {
  return (
    <div className="dc p-8 min-h-screen bg-linear-to-r from-pink-100 to-purple-100">
      <Card className="w-full max-w-md has-[#signup-form]:max-w-2xl">
        <CardContent className="p-8">
          {children}
        </CardContent>
      </Card>
    </div>
  )
}

export default Layout
