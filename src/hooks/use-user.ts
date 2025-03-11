import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { addLiked, getLikesList, getMatches, removeLiked } from "@/actions";

export function useUsersList() {
  const limit = 50

  return useInfiniteQuery<Partial<userT>[], Error, Partial<userT>[]>({
    queryKey: ["user-list", "approved"],
    queryFn: ({ pageParam }) => {
      return getMatches({
        skip: (pageParam as number || 0) * limit,
        limit,
        approvalStatus: "approved",
      })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.length === limit ? pages.length : undefined,
    select: data => data?.pages?.flat() as any,
  })
}

export function useLikesList(type: "liked" | "disliked") {
  const limit = 50

  return useInfiniteQuery<Partial<userT>[], Error, Partial<userT>[]>({
    queryKey: ["likes-list", type],
    queryFn: ({ pageParam }) => {
      return getLikesList({
        skip: (pageParam as number || 0) * limit,
        limit,
        type,
      })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.length === limit ? pages.length : undefined,
    select: data => data?.pages?.flat() as any,
  })
}

export function useAddLiked() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: addLiked,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes-list", "liked"] })
      toast.success("User added to liked list successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to add user to liked list");
    },
  })
}

export function useRemoveLiked() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: removeLiked,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes-list", "disliked"] })
      toast.success("User removed from liked list successfully");
    },
    onError: (error) => {
      toast.error(error?.message || "Failed to remove user from liked list");
    },
  })
}
