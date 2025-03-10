"use client";

import sendApiReq from "@/utils/sendApiReq";
import endPoints from "@/utils/endPoints";

export function getUsersList(params: any = {}) {
  return sendApiReq({
    url: endPoints.getPendingList,
    params,
  })
}

type dataT = { _id: string, approvalStatus: "approved" | "rejected" }
export function updateApproval(data: dataT) {
  return sendApiReq({
    url: endPoints.updateApproval,
    method: "PUT",
    data,
  })
}

