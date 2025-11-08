"use client";

import { useMutation, useInfiniteQuery, useQueryClient, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getPaidUsers, getAssistedSubscribedUsers, getAllPayments, getUsersByCreatedBy,
  getUsersGroupedByAdminCount, getUsersGroupedCount, getAdminsList,
  createAdmin, updateAdmin, getNotInvitedUsers, userInvited,
  getUsersGroupList,
} from "@/actions";
import { findUserSchemaT } from "./use-user-filters";

type userAndPlanT = currentPlanT & {
  user: Partial<userT>
  assistedExpire: string
}
export function useGetPaidUsers() {
  const limit = 50

  return useInfiniteQuery<userAndPlanT[], Error, userAndPlanT[]>({
    queryKey: ["paid-users"],
    queryFn: ({ pageParam }) => getPaidUsers({ skip: (pageParam as number || 0) * limit, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.length === limit ? pages.length : undefined,
    select: data => data?.pages?.flat() as any,
  })
}

export function useGetAssistedSubscribedUsers() {
  const limit = 50

  return useInfiniteQuery<userAndPlanT[], Error, userAndPlanT[]>({
    queryKey: ["assisted-subscribed-users"],
    queryFn: ({ pageParam }) => getAssistedSubscribedUsers({ skip: (pageParam as number || 0) * limit, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.length === limit ? pages.length : undefined,
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
    queryFn: ({ pageParam }) => getAllPayments({ skip: (pageParam as number || 0) * limit, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.length === limit ? pages.length : undefined,
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
    queryFn: ({ pageParam }) => getUsersByCreatedBy({ skip: (pageParam as number || 0) * limit, limit, ...data }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.length === limit ? pages.length : undefined,
    select: data => data?.pages?.flat() as any,
  })
}

type ucspaT = adminT & {
  data: Record<string, number>
}
export function useGetUsersGroupedByAdminCount(type: "date" | "caste" = "date") {
  return useQuery<ucspaT[], Error, ucspaT[]>({
    queryKey: ["users-grouped-by-admin", type],
    queryFn: () => getUsersGroupedByAdminCount(type),
  })
}

type uctT = adminT & {
  created: number
}
export function useGetUsersGroupedCount(params: any = {}) {
  return useQuery<uctT[], Error, uctT[]>({
    queryKey: ["users-grouped-count", params],
    queryFn: () => getUsersGroupedCount(params),
  })
}

type uglT = Pick<userT, "_id" | "fullName" | "maritalStatus" | "profileImg" | "isBlocked" | "isDeleted">
export function useGetUsersGroupList(params: any = {}) {
  const limit = 50

  return useInfiniteQuery<uglT[], Error, uglT[]>({
    queryKey: ["users-group-list", params],
    queryFn: ({ pageParam }) => getUsersGroupList({ skip: (pageParam as number || 0) * limit, limit, ...params }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.length === limit ? pages.length : undefined,
    select: data => data?.pages?.flat() as any,
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

export type niuT = Pick<userT, "_id" | "contactDetails" | "dob" | "profileImg" | "fullName">
export function useGetNotInvitedUsers(data: findUserSchemaT) {
  const limit = 50
  const payload: Record<string, unknown> = {}

  for (const key of Object.keys(data) as (keyof findUserSchemaT)[]) {
    const value = data[key]
    payload[key] = Array.isArray(value) ? value.join(',') : value
  }
  console.log(payload)

  return useInfiniteQuery<niuT[], Error, niuT[]>({
    queryKey: ["not-invited-users"],
    queryFn: ({ pageParam }) => getNotInvitedUsers({ skip: (pageParam as number || 0) * limit, limit }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => lastPage.length === limit ? pages.length : undefined,
    select: data => data?.pages?.flat() as any,
  })
}

export function useUserInvite() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: userInvited,
    onSuccess() {
      toast("User invited successfully")
      queryClient.invalidateQueries({ queryKey: ["not-invited-users"] })
    },
    onError(error) {
      toast(error?.message || "Something went wrong!!!")
    }
  })
}
