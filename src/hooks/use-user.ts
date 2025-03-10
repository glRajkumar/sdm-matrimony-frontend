import { useInfiniteQuery } from "@tanstack/react-query";
import { getMatches } from "@/actions";

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
