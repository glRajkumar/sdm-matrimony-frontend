"use client"

import { useQuery } from "@tanstack/react-query";

import { getMatches } from "@/actions/user";
import useUserStore from "@/store/user";

import Card from "./card";

function UsersList() {
  const gender = useUserStore(state => state.gender)

  const { data } = useQuery({
    queryKey: ["get-users"],
    queryFn: () => getMatches(gender)
  })

  return data?.map((user: any) => (
    <Card
      key={user._id}
      id={user._id}
      fullName={user.fullName}
      image={user.images[0] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
      email={user.email}
    />
  ))
}

export default UsersList
