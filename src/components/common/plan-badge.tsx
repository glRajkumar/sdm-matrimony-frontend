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
