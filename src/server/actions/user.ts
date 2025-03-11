import sendApiReq from "../utils/send-api-req-server";
import endPoints from "@/utils/endPoints";

export function getUserDetails(_id: string) {
  return sendApiReq({
    url: `${endPoints.getUserDetails}/${_id}`,
  })
}
