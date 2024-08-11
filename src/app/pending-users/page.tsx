import { getPendingList, updateApproval } from '@/actions'
import { Button } from '@/components/ui/button'
import useUserStore from '@/store/user'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

function PendingUsers() {
  const user_id = useUserStore(state => state?.id)

  const [approval, setApproval] = useState("")

  const { data } = useQuery({
    queryKey: ["pending-user-list"],
    queryFn: getPendingList
  })

  const { mutate } = useMutation({
    mutationFn: updateApproval,
    onSuccess(data) {
      console.log(data)
    },
  })

  const onSubmit = () => {
    let payload: { id: string, approvalStatus: string } = {
      id: user_id,
      approvalStatus: approval
    }
    mutate(payload)
  }

  return (
    <div>
      {
        data?.map((item: { id: string, firstnName: string }) => {
          return (
            <div className='bg-white p-4 rounded-[10px] flex justify-between items-center'>
              <p>{item?.firstnName}</p>
              <div className='flex items-center gap-2'>
                <Button
                  className='text-white bg-green-500'
                  onClick={() => {
                    setApproval("approved")
                    onSubmit()
                  }}
                >
                  Approve
                </Button>
                <Button
                  className='text-white bg-red-500'
                  onClick={() => {
                    setApproval("rejected")
                    onSubmit()
                  }}
                >
                  Reject
                </Button>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default PendingUsers
