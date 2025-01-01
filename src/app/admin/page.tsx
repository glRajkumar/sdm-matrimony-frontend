"use client";

import { useApprovalMutate, usePendingList } from '@/hooks/use-admin';
import { ColumnToggle, DataTable, FilterGroup, Pagination, useTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { Input } from '@/components/ui/input';
import { ColumnFacetedFilter } from '@/components/ui/data-table/column-faceted-filter';

function PendingUsers() {
  const { data: users } = usePendingList()

  const table = useTable({ data: users || [], columns })

  const { mutate } = useApprovalMutate()

  return (
    <section className="h-[calc(100vh-3rem)] px-2 sm:px-4 py-8 overflow-y-auto">
      <div className='df'>
        <Input
          className='w-60'
          value={table.getState().globalFilter}
          onChange={e => table.setGlobalFilter(e.target.value)}
        />

        <FilterGroup
          table={table}
          options={[
            {
              key: "fullName",
              lable: "FullName",
              options: ["raj", "ClintonCunningham"]
            }
          ]}
        />

        <ColumnFacetedFilter
          column={table.getColumn("gender")}
          title="gender"
          options={[
            {
              label: "male",
              value: "male",
            },
            {
              label: "female",
              value: "female",
            },
          ]}
        />

        <ColumnToggle table={table} />
      </div>

      <DataTable
        table={table}
        className='my-4'
      />

      <Pagination table={table} />

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
