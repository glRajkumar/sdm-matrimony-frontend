"use client";

import { format } from "date-fns";

type props = {
  dob: string
}

function Dob({ dob }: props) {
  return (
    <p className="font-medium">
      {dob ? format(new Date(dob), "dd/MM/yyyy") : "---"}
    </p>
  )
}

export default Dob
