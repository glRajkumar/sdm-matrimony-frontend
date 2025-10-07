"use client";

import { useMutation, useInfiniteQuery, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getPaidUsers, getAssistedSubscribedUsers, getAllPayments, getUsersByCreatedBy,
  getUsersStatsCreatedBy, getUsersStatsCreated, getAdminsList,
  createAdmin, updateAdmin,
} from "@/actions";

type userAndPlanT = currentPlanT & {
  user: Partial<userT>
  assistedExpire: string
}
export function useGetPaidUsers() {
  const limit = 50

  return useInfiniteQuery<userAndPlanT[], Error, userAndPlanT[]>({
    queryKey: ["paid-users"],
    queryFn: ({ pageParam }) => getPaidUsers({ skip: pageParam || 0, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.length === limit ? lastPage.length : undefined,
    select: data => data?.pages?.flat() as any,
  })
}

export function useGetAssistedSubscribedUsers() {
  const limit = 50

  return useInfiniteQuery<userAndPlanT[], Error, userAndPlanT[]>({
    queryKey: ["assisted-subscribed-users"],
    queryFn: ({ pageParam }) => getAssistedSubscribedUsers({ skip: pageParam || 0, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.length === limit ? lastPage.length : undefined,
    select: data => data?.pages?.flat() as any,
  })
}

type userAllPaymentsT = {
  _id: string
  user: Partial<userT>
  payments: currentPlanT[]
}
export function useGetAllPayments() {
  const limit = 50

  return useInfiniteQuery<userAllPaymentsT[], Error, userAllPaymentsT[]>({
    queryKey: ["all-payments"],
    queryFn: ({ pageParam }) => getAllPayments({ skip: pageParam || 0, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.length === limit ? lastPage.length : undefined,
    select: data => data?.pages?.flat() as any,
  })
}

type createdByProps = {
  createdBy?: string
  createdAtToday?: boolean
}
export function useGetUsersByCreatedBy(data: createdByProps) {
  const limit = 50

  return useInfiniteQuery<Partial<userT>[], Error, Partial<userT>[]>({
    queryKey: ["users-by-created-by", data],
    queryFn: ({ pageParam }) => getUsersByCreatedBy({ skip: pageParam || 0, limit, ...data }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.length === limit ? lastPage.length : undefined,
    select: data => data?.pages?.flat() as any,
  })
}

type ucspaT = adminT & {
  dates: Record<string, number>
}
export function useGetUserCreationStatsPerAdmin() {
  return useQuery<ucspaT[], Error, ucspaT[]>({
    queryKey: ["user-creation-stats-per-admin"],
    queryFn: getUsersStatsCreatedBy,
  })
}

export type uctT = adminT & {
  created: number
  users: Pick<userT, "_id" | "fullName" | "maritalStatus" | "profileImg">[]
}
export function useGetUserCreationStats(date: string) {
  return useQuery<uctT[], Error, uctT[]>({
    queryKey: ["user-creation-stats", date],
    queryFn: () => getUsersStatsCreated(date),
  })
}

export function useGetAdmins() {
  return useQuery<adminT[], Error, adminT[]>({
    queryKey: ["admins"],
    queryFn: getAdminsList,
  })
}

export function useUpdateAdmin() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: any) => data._id ? updateAdmin(data) : createAdmin(data),
    onSuccess(_, variables) {
      toast(`Admin ${variables._id ? "updated" : "created"} successfully`)
      queryClient.invalidateQueries({ queryKey: ["admins"] })
    },
    onError(error) {
      toast(error?.message || "Something went wrong!!!")
    }
  })
}
