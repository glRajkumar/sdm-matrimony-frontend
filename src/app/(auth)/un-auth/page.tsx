import { CardDescription, CardTitle } from '@/components/ui/card'
import React from 'react'

function Page() {
  return (
    <div>
      <div className="flex flex-col items-center space-y-2 mb-6">
        <CardTitle>Un Authorised Entry</CardTitle>
        <CardDescription>Contact Us: 7685874786</CardDescription>
      </div>
    </div>
  )
}

export default Page