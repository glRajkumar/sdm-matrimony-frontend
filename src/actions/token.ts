"use client";

import Cookies from "js-cookie";

import { tokenEnums, tokenValidity } from "@/utils";

export function getToken() {
  return Cookies.get(tokenEnums.accessToken)
}

export function setToken(token: string) {
  const expires = new Date(new Date().getTime() + tokenValidity.accessToken * 1000)
  Cookies.set(tokenEnums.accessToken, token, { expires })
}

export const removeToken = () => Cookies.remove(tokenEnums.accessToken)