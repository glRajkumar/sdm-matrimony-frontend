"use server";

import { jwtVerify } from "jose";

export async function decodeJwt(token: string) {
  if (!token) throw Error("Token not provided")

  const secret = new TextEncoder().encode(process.env.jwtSecretKey)
  const { payload } = await jwtVerify(token, secret)
  return payload
}
