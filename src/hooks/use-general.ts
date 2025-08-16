"use client";

import { useQuery } from "@tanstack/react-query";

import { getStatics } from "@/actions";

export function useStaticsVersion() {
  return useQuery({
    queryKey: ["statics", "latest.json"],
    queryFn: () => getStatics("latest.json"),
  })
}

export function useStatics(name: staticsNameT) {
  const { data } = useStaticsVersion()

  return useQuery({
    queryKey: ["statics", name],
    queryFn: () => getStatics(data?.[name]),
    enabled: !!name && !!data,
  })
}
