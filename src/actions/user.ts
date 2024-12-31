"use client";

import sendApiReq from "@/utils/sendApiReq";
import endPoints from "@/utils/endPoints";

export function getUsers() {
  return sendApiReq({
    url: endPoints.getUsers,
  })
}

export function getUserDetails(id: string) {
  return sendApiReq({
    url: `${endPoints.getUserDetails}/${id}`,
  })
}

export function imgUpload(userData: any) {
  return sendApiReq({
    url: endPoints.imgUpload,
    method: "POST",
    data: { userData },
  })
}

export function getMatches(userData: any) {
  return sendApiReq({
    url: endPoints.getMatches,
    method: "GET",
    data: { userData },
  })
}
