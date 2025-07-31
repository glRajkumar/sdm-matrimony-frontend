"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import { useVerifyAccount } from "@/hooks/use-account";

function Page() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const { mutate } = useVerifyAccount()

  useEffect(() => {
    if (!token) return

    mutate({ token })
  }, [token])

  return null
}

export default Page
