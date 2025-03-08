"use client"

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getMatches } from "@/actions/user";
import useUserStore from "@/store/user";

import Filter from "./filter";
import Card from "./card";

interface filterDataProps {
  gender: string,
  marriedStatus: string,
  salrayRange: string,
  rasi: string,
  age: string
}

function UsersList() {
  const gender = useUserStore(state => state.gender)

  const [filterData, setFilterData] = useState<filterDataProps>({
    gender: gender,
    marriedStatus: "unmarried",
    salrayRange: "",
    rasi: "",
    age: ""
  })

  const { data } = useQuery({
    queryKey: ["get-users", filterData],
    queryFn: () => getMatches(filterData)
  })

  console.log("filer", filterData)

  return (
    <div>
      <Filter
        filterData={filterData}
        setFilterData={setFilterData}
      />

      {
        data?.map((user: any) => (
          <Card
            key={user._id}
            id={user._id}
            fullName={user.fullName}
            image={user.images[0] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
          />
        ))
      }
    </div>
  )
}

export default UsersList
