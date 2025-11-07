import { sendApiReq, endPoints } from "@/services";

export function createOrder(data: any) {
  return sendApiReq({
    url: endPoints.createOrder,
    method: "post",
    data,
  })
}

export function verifyPayment(data: any) {
  return sendApiReq({
    url: endPoints.verifyPayment,
    method: "post",
    data,
  })
}

export function testCreateOrder(data: any) {
  return sendApiReq({
    url: endPoints.testCreateOrder,
    method: "post",
    data,
  })
}

export function testVerifyPayment(data: any) {
  return sendApiReq({
    url: endPoints.testVerifyPayment,
    method: "post",
    data,
  })
}
