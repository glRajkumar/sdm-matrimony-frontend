"use server";

import { tokenEnums } from "@/utils";
import { cookies } from "next/headers";

export async function getServerSideToken() {
  const cookiesStore = await cookies()
  const token = cookiesStore.get(tokenEnums.accessToken)?.value
  return token
}
