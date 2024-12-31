"use client";

import sendApiReq from "@/utils/sendApiReq";
import endPoints from "@/utils/endPoints";

export function getPendingList() {
  return sendApiReq({
    url: endPoints.getPendingList,
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

