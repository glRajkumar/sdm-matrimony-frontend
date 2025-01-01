"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPendingList, updateApproval } from "@/actions";
import { toast } from "sonner";

export function usePendingList() {
  return useQuery<pendingUsersListT[]>({
    queryKey: ["pending-user-list"],
    queryFn: getPendingList,
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