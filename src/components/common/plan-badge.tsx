import { ForwardRefExoticComponent, RefAttributes } from "react";
import { Star, Gem, Crown, LucideProps, Feather } from "lucide-react";

import { cn } from "@/lib/utils";

import { Badge, type badgeProps } from "@/components/ui/badge";

type props = badgeProps & {
  subscribedTo: subscribedToT
  iconClassName?: string
}

type planDetailsT = {
  name: string
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
  bgColor: string
  textColor: string
  duration: string
}

export const planValidityMonths: Record<subscribedToT, number> = {
  basic: 3,
  gold: 6,
  diamond: 9,
  platinum: 12,
} as const

export const planPrices: Record<subscribedToT, number> = {
  basic: 1_500,
  gold: 3_200,
  diamond: 5_500,
  platinum: 7_000,
}

export const profilesCount: Record<subscribedToT, number> = {
  basic: 20,
  gold: 45,
  diamond: 70,
  platinum: 100,
}

export const extraProfiles: any = {
  10: 1_000,
  20: 1_850,
  40: 3_000,
  100: 7_000,
  999: 20_000,
}

export const assistedPrices: any = {
  1: 10_000,
  2: 18_000,
  3: 25_000,
  4: 34_000,
  5: 42_000,
  6: 50_000,
}

export const planDetails: Record<subscribedToT, planDetailsT> = {
  basic: {
    icon: Feather,
    name: "Basic",
    bgColor: "bg-blue-50",
    textColor: "text-blue-600",
    duration: "3 months",
  },
  gold: {
    icon: Star,
    name: "Gold",
    bgColor: "bg-yellow-50",
    textColor: "text-yellow-600",
    duration: "6 months",
  },
  diamond: {
    icon: Gem,
    name: "Diamond",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    duration: "9 months",
  },
  platinum: {
    icon: Crown,
    name: "Platinum",
    bgColor: "bg-orange-50",
    textColor: "text-orange-600",
    duration: "12 months",
  },
}

export function PlanBadge({ subscribedTo, className, iconClassName, ...props }: props) {
  const Icon = planDetails[subscribedTo].icon || planDetails.basic.icon
  return (
    <Badge
      {...props}
      className={cn(
        planDetails[subscribedTo].bgColor,
        className,
      )}
    >
      {<Icon className={cn(iconClassName, planDetails[subscribedTo].textColor)} />}
    </Badge>
  )
}
