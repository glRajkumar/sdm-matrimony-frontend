"use client";

import { useApprovalMutate, usePendingList } from '@/hooks/use-admin';
import { DataTable, useTable } from "@/components/ui/data-table";
import { columns } from "./columns";

function PendingUsers() {
  const { data: users } = usePendingList()

  const table = useTable({ data: users || [], columns })

  const { mutate } = useApprovalMutate()

  return (
    <section className="h-[calc(100vh-3rem)] px-2 sm:px-4 py-8 overflow-y-auto">
      {
        users &&
        <DataTable
          table={table}
        />
      }

      {/* <div className='flex items-center gap-2'>
          <Button
            className='h-8 px-3 text-xs text-white bg-green-500 hover:bg-green-600'
            onClick={() => mutate({ _id: user?._id, approvalStatus: "approved" })}
          >
            Approve
          </Button>

          <Button
            className='h-8 px-3 text-xs text-white bg-red-500 hover:bg-red-600'
            onClick={() => mutate({ _id: user?._id, approvalStatus: "rejected" })}
          >
            Reject
          </Button>
        </div> */}
    </section>
  )
}

export default PendingUsers
