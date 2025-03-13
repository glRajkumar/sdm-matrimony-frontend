"use client";

import { useMutation, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getUsersList, updateUserDetails } from "@/actions";
import { toast } from "sonner";

export type userListProps = {
  approvalStatus?: approvalStatusT | approvalStatusT[]
  isBlocked?: boolean
  isDeleted?: boolean
}
export function useUsersList({ approvalStatus, isBlocked, isDeleted }: userListProps) {
  const limit = 50
  const payload: any = {}

  if (approvalStatus) {
    payload["approvalStatus"] = approvalStatus.toString()
  }
  if (isBlocked) {
    payload["isBlocked"] = isBlocked
  }
  if (isDeleted) {
    payload["isDeleted"] = isDeleted
  }

  return useInfiniteQuery<Partial<userT>[], Error, Partial<userT>[]>({
    queryKey: ["user-list", payload],
    queryFn: ({ pageParam }) => {
      return getUsersList({
        skip: (pageParam as number || 0) * limit,
        limit,
        ...payload,
      })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.length === limit ? pages.length : undefined,
    select: data => data?.pages?.flat() as any,
  })
}

export function useUpdateUserMutate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateUserDetails,
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["user-list"] })
      toast("Applicant details successfully")
    },
    onError(error) {
      toast(error?.message || "Something went wrong!!!")
    }
  })
}