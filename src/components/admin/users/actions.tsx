import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";

import type { tab } from "./types";

import { useUpdateUserMutate } from "@/hooks/use-admin";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type props = {
  _id: string
  currentTab: tab
  role: rolesT
}

function Actions({ _id, currentTab, role }: props) {
  const { mutate } = useUpdateUserMutate()

  function updateStatus(approvalStatus: "approved" | "rejected") {
    mutate({ _id, approvalStatus, isBlocked: false, isDeleted: false })
  }

  function updateActions(data: Partial<userT>) {
    mutate({ _id, ...data, approvalStatus: "pending" })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-2">
        <BsThreeDots />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/${role}/user/${_id}`}>
            View
          </Link>
        </DropdownMenuItem>

        {
          currentTab !== "approved" && (
            <DropdownMenuItem
              onClick={() => updateStatus("approved")}
            >
              Approve
            </DropdownMenuItem>
          )
        }

        {
          (currentTab === "pending" || currentTab === "approved") && (
            <DropdownMenuItem
              onClick={() => updateStatus("rejected")}
            >
              Reject
            </DropdownMenuItem>
          )
        }

        {
          currentTab !== "blocked" && currentTab !== "deleted" && (
            <DropdownMenuItem
              onClick={() => updateActions({ isBlocked: true })}
            >
              Block
            </DropdownMenuItem>
          )
        }

        {
          currentTab === "blocked" && (
            <DropdownMenuItem
              onClick={() => updateActions({ isBlocked: false })}
            >
              Unblock
            </DropdownMenuItem>
          )
        }

        {
          currentTab !== "deleted" && (
            <DropdownMenuItem
              onClick={() => updateActions({ isDeleted: true })}
            >
              Delete
            </DropdownMenuItem>
          )
        }

        {
          currentTab === "deleted" && (
            <DropdownMenuItem
              onClick={() => updateActions({ isDeleted: false })}
            >
              Restore
            </DropdownMenuItem>
          )
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default Actions
