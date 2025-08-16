"use client";

import { useQuery } from "@tanstack/react-query";

import { getStatics } from "@/actions";

export function useStatics(name: string) {
  return useQuery({
    queryKey: ["statics", name],
    queryFn: () => getStatics(name),
    enabled: !!name,
  })
}
