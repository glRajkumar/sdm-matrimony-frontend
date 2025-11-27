import { BsThreeDots } from "react-icons/bs";
import Link from "next/link";

import type { tab } from "./types";

import { useResetPassByAdmin } from "@/hooks/use-super-admin";
import { useUpdateUserMutate } from "@/hooks/use-admin";
import { createPass } from "@/utils/password";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type props = {
  _id: string
  dob: string
  role: rolesT
  fullName: string
  currentTab: tab
}

function Actions({ _id, currentTab, role, fullName, dob }: props) {
  const { mutate: resetPass, isPending: resetPassPending } = useResetPassByAdmin()
  const { mutate } = useUpdateUserMutate()

  function updateStatus(approvalStatus: "approved" | "rejected") {
    mutate({ _id, approvalStatus, isBlocked: false, isDeleted: false })
  }

  function updateActions(data: Partial<userT>) {
    mutate({ _id, ...data, approvalStatus: "pending" })
  }

  function onReset() {
    resetPass({ _id, password: createPass(fullName, dob) })
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
          role === "super-admin" && currentTab === "approved" &&
          <DropdownMenuItem
            onClick={onReset}
            disabled={resetPassPending}
          >
            Reset Password
          </DropdownMenuItem>
        }

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
