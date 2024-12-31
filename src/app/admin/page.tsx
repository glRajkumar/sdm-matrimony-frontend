"use client";

import { useApprovalMutate, usePendingList } from '@/hooks/use-admin';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

function PendingUsers() {
  const { data: users } = usePendingList()

  const { mutate } = useApprovalMutate()

  return (
    <section className="h-[calc(100vh-3rem)] px-2 sm:px-4 py-8 overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Salary</TableHead>
            <TableHead>Date of Birth</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users?.map((user: any) => (
            <TableRow key={user?._id}>
              <TableCell>{user?.fullName}</TableCell>
              <TableCell>{user?.email}</TableCell>
              <TableCell className='capitalize'>{user?.gender}</TableCell>
              <TableCell>₹{user?.salary}</TableCell>
              <TableCell>{user?.dob}</TableCell>

              <TableCell>
                <div className='flex items-center gap-2'>
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
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

export default PendingUsers
