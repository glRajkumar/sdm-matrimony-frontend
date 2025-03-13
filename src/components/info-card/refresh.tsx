"use client";

import { Loader } from "lucide-react";

import { useCheckApprovalStatus } from "@/hooks/use-account";

import { Button } from "../ui/button";

function Refresh() {
  const { mutate, isPending } = useCheckApprovalStatus()

  return (
    <Button
      size="sm"
      variant="secondary"
      onClick={() => mutate()}
      disabled={isPending}
    >
      {isPending && <Loader className="animate-spin" />}
      Refresh
    </Button>
  )
}

export default Refresh
