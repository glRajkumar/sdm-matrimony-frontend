import Link from "next/link";

import { Button } from "@/components/ui/button";

function Cta() {
  return (
    <section className="py-20 bg-gradient-to-r from-rose-400 to-pink-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Find Your Perfect Match?</h2>
          <p className="text-xl text-rose-100 max-w-2xl mx-auto">
            Join thousands of happy couples who found love through LoveConnect. Your soulmate is waiting for you.
          </p>

          <div className="dc">
            <Button
              asChild
              size="lg"
              className="bg-white text-rose-500 hover:bg-rose-50 px-8 py-3 text-lg font-semibold"
            >
              <Link href="/auth/user/signup">Start Your Journey</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cta
