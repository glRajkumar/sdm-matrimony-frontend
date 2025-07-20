import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";

function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-rose-50 via-pink-50 to-white py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="df w-fit bg-primary/5 px-4 py-2 rounded-full">
              <Heart className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">India's #1 Fastest Growing Matrimony Platform</span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tighter">
                Find Your
                <span className="bg-gradient-to-r from-rose-500 to-pink-600 bg-clip-text text-transparent block">
                  Perfect Match
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Join thousands of happy couples who found their soulmate through our trusted matrimony platform. Your
                journey to forever starts here.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-rose-400 to-pink-500 hover:from-rose-500 hover:to-pink-600 text-white px-8 py-3 text-lg"
              >
                Get Started Today
              </Button>
            </div>

            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-500">500+</div>
                <div className="text-sm text-gray-600">Happy Couples</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-500">10k+</div>
                <div className="text-sm text-gray-600">Verified Profiles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-rose-500">99%</div>
                <div className="text-sm text-gray-600">Success Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                alt="Happy couple"
                src="/imgs/hero-couple.jpg"
                className="w-full h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            <div className="absolute -top-6 -left-2 md:-left-6 bg-card p-4 rounded-xl shadow-lg border border-border">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">2k+ Active Users</span>
              </div>
            </div>

            <div className="absolute -bottom-6 -right-2 md:-right-6 bg-card p-4 rounded-xl shadow-lg border border-border">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">99%</div>
                <div className="text-sm text-muted-foreground">Success Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
