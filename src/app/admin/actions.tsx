import { BsThreeDots } from "react-icons/bs";

import { useApprovalMutate } from "@/hooks/use-admin";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type props = {
  _id: string
  status: approvalStatusT
}

function Actions({ _id, status }: props) {
  const { mutate } = useApprovalMutate()

  function updateStatus(approvalStatus: "approved" | "rejected") {
    mutate({ _id, approvalStatus })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BsThreeDots />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {
          status === "pending" && (
            <DropdownMenuItem
              onClick={() => updateStatus("approved")}
            >
              Approve
            </DropdownMenuItem>
          )
        }

        {
          (status === "pending" || status === "approved") && (
            <DropdownMenuItem
              onClick={() => updateStatus("rejected")}
            >
              Reject
            </DropdownMenuItem>
          )
        }

        {
          status === "rejected" && (
            <DropdownMenuItem
              onClick={() => updateStatus("approved")}
            >
              Re-Approve
            </DropdownMenuItem>
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Actions
