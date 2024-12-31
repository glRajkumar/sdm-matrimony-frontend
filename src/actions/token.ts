"use client";

import Cookies from "js-cookie";

export function getToken() {
  return Cookies.get("sdm")
}

export function setToken(token: string) {
  const expires = new Date(new Date().getTime() + 18 * 60 * 60 * 1000) // 18h
  Cookies.set('sdm', token, { expires })
}

export const removeToken = () => Cookies.remove("sdm")