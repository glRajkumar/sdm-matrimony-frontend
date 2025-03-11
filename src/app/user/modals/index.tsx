"use client";

import useUIStore from "@/store/ui";

import UserDetails from "./user-details";

function Modals() {
  const open = useUIStore(s => s.open)

  return (
    <>
      {
        open === "user-details" &&
        <UserDetails />
      }
    </>
  )
}

export default Modals
