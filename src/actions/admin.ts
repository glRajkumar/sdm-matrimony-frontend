import sendApiReq from "@/utils/sendApiReq";
import endPoints from "@/utils/endPoints";

export function getUsersList(params: any = {}) {
  return sendApiReq({
    url: endPoints.getUsersList,
    params,
  })
}

export function updateUserDetails(data: Partial<userT>) {
  return sendApiReq({
    url: endPoints.updateUserDetails,
    method: "PUT",
    data,
  })
}

