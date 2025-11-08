"use client";

import { useMutation, useInfiniteQuery, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import { type findUserSchemaT } from "./use-user-filters";

import {
  createUsers, extractImg, findUser, getMarriedUsers, getUsersList,
  updateUserDetails, userMarriedTo,
} from "@/actions";

export function useUsersList(data: findUserSchemaT) {
  const limit = 50

  return useInfiniteQuery<Partial<userT>[], Error, Partial<userT>[]>({
    queryKey: ["user-list", data],
    queryFn: ({ pageParam }) => {
      return getUsersList({
        skip: (pageParam as number || 0) * limit,
        limit,
        ...data,
      })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.length === limit ? pages.length : undefined,
    select: data => data?.pages?.flat() as any,
  })
}

type marriedUserT = Partial<userT> & { marriedTo: Partial<userT> }
export function useMarriedUsers() {
  const limit = 50

  return useInfiniteQuery<marriedUserT[], Error, marriedUserT[]>({
    queryKey: ["married-users"],
    queryFn: ({ pageParam }) => {
      return getMarriedUsers({
        skip: (pageParam as number || 0) * limit,
        limit,
      })
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.length === limit ? pages.length : undefined,
    select: data => data?.pages?.flat() as any,
  })
}

export function useFindUser(params: any) {
  return useQuery<Partial<userT>[]>({
    queryKey: ["find-user", params],
    queryFn: () => findUser(params),
    enabled: !!params && Object.keys(params).length > 1,
  })
}

export function useCreateUsersMutate() {
  return useMutation({
    mutationFn: createUsers,
    onSuccess() {
      toast.success("New user(s) created successfully")
    },
    onError(error) {
      toast.error(error?.message || "Something went wrong!!!")
    }
  })
}

export function useUserMarriedToMutate() {
  return useMutation({
    mutationFn: userMarriedTo,
    onSuccess() {
      toast("User marriage details updated successfully")
    },
    onError(error) {
      toast(error?.message || "Something went wrong!!!")
    }
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

export function useExtractImgMutate() {
  return useMutation({
    mutationFn: extractImg,
    onSuccess() {
      toast("Images extracted successfully")
    },
    onError(error) {
      toast(error?.message || "Something went wrong!!!")
    }
  })
}
