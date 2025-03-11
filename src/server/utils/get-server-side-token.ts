"use server";

import { cookies } from "next/headers";

export async function getServerSideToken() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get("sdm")?.value
  return token
}
