import { sendApiReq, endPoints } from "@/services";

export function createOrder(amount: number) {
  return sendApiReq({
    url: endPoints.createOrder,
    method: "post",
    data: { amount },
  })
}

export function verifyPayment(data: any) {
  return sendApiReq({
    url: endPoints.verifyPayment,
    method: "post",
    data,
  })
}
