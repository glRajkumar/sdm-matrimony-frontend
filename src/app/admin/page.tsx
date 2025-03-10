"use client";

import { useUsersList } from '@/hooks/use-admin';
import { ColumnToggle, DataTable, Pagination, useTable } from "@/components/ui/data-table";
import { approvalStatus, gender, maritalStatus } from '@/utils/enums';

import { columns } from "./columns";

import { ColumnFacetedFilter } from '@/components/ui/data-table/column-faceted-filter';
import { Input } from '@/components/ui/input';

function PendingUsers() {
  const { data: users, isLoading } = useUsersList()

  const table = useTable({ data: users || [], columns })

  if (isLoading) return (
    <div className='dc h-[calc(100vh-3rem)]'>
      Loading...
    </div>
  )

  return (
    <section className="px-2 sm:px-4 py-8">
      <div className='df'>
        <Input
          className='w-60'
          value={table.getState().globalFilter}
          onChange={e => table.setGlobalFilter(e.target.value)}
        />

        <ColumnFacetedFilter
          column={table.getColumn("gender")}
          title="Gender"
          options={gender.map(gen => ({ label: gen, value: gen }))}
        />

        <ColumnFacetedFilter
          column={table.getColumn("approvalStatus")}
          title="Approval Status"
          options={approvalStatus.map(status => ({ label: status, value: status }))}
        />

        <ColumnFacetedFilter
          column={table.getColumn("maritalStatus")}
          title="Marital Status"
          options={maritalStatus.map(status => ({ label: status, value: status }))}
        />
        <ColumnToggle table={table} />
      </div>

      <DataTable
        table={table}
        className='my-4'
      />

      <Pagination table={table} />
    </section>
  )
}

export default PendingUsers
