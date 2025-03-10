"use client";

import sendApiReq from "@/utils/sendApiReq";
import endPoints from "@/utils/endPoints";

export function getMatches(params: any) {
  return sendApiReq({
    url: endPoints.getMatches,
    params,
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
