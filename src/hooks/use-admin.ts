"use client";

import { useMutation, useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { getUsersList, updateApproval } from "@/actions";
import { toast } from "sonner";

export function useUsersList() {
  const limit = 50
  return useInfiniteQuery<pendingUsersListT[]>({
    queryKey: ["pending-user-list"],
    queryFn: ({ pageParam }) => {
      return getUsersList({
        skip: (pageParam as number || 0) * limit,
        limit,
        approvalStatus: ["pending", "approved"].toString(),
      })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.length === limit ? pages.length : undefined,
    select: data => data?.pages?.flat() as any,
  })
}

export function useApprovalMutate() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateApproval,
    onSuccess(_, variables) {
      queryClient.invalidateQueries({ queryKey: ["pending-user-list"] })
      toast(`Applicant status ${variables?.approvalStatus} successfully`)
    },
    onError(error) {
      toast(error?.message || "Something went wrong!!!")
    }
  })
}