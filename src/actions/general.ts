import { sendApiReq, endPoints } from "@/services";

export function getStatics(name: string) {
  return sendApiReq({
    url: endPoints.static + `/${name}`,
    isAuthendicated: false,
  })
}
