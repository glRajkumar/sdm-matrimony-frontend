import { getApproval, getPendingUsers } from '@/actions'
import { Button } from '@/components/ui/button'
import useUserStore from '@/store/user'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'

function PendingUsers() {
  const user_id = useUserStore(state => state?.id)
  const [approve, setApprove] = useState("")
  const { data } = useQuery({
    queryKey: ["pending-user-list"],
    queryFn: getPendingUsers
  })
  const { mutate } = useMutation({
    mutationFn: getApproval,
    onSuccess(data, variables, context) {

    },
  })

  const onSubmit = () => {
    let payload: { id: string, approval_required: string } = {
      id: user_id,
      approval_required: approve
    }
    mutate(payload)
  }
  return (
    <div>
      {
        data?.map((item: { id: string, firstnName: string }) => {
          return (
            <div>
              {item?.firstnName}
              <Button
                className='text-white bg-green-500'
                onClick={() => {
                  setApprove("approved")
                  onSubmit()
                }
                }
              >
                Approve
              </Button>
              <Button
                className='text-white bg-red-500'
                onClick={() => {
                  setApprove("rejected")
                  onSubmit()
                }}
              >
                Reject
              </Button>
            </div>
          )
        })
      }
    </div>
  )
}

export default PendingUsers
