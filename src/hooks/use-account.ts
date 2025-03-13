"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { checkApprovalStatus, forgotPass, login, logout, registerImage, resetPass, signup, } from "@/actions";
import { removeToken, setToken } from "@/actions/token";
import useUserStore from "@/store/user";

export function useSignup() {
  const router = useRouter()

  return useMutation({
    mutationFn: signup,
    onSuccess(_, variables) {
      const base = variables?.role === "user" ? "/auth" : `/auth/${variables?.role}`
      toast('Account created successfully')
      router.push(`${base}/signin`)
    },
    onError(error) {
      toast('Signup failed', {
        description: error?.message
      })
    },
  })
}

export function useRegisterImage() {
  return useMutation({
    mutationFn: registerImage,
  })
}

export function useLogin() {
  const router = useRouter()
  const updateUser = useUserStore(s => s.updateUser)

  return useMutation({
    mutationFn: login,
    onSuccess(res) {
      const { token, ...rest } = res
      setToken(token)
      updateUser(rest)
      toast('Logged in successfully')
      router.replace("/")
    },
    onError(error) {
      toast('Login failed', {
        description: error.message
      })
    },
  })
}

export function useCheckApprovalStatus() {
  const router = useRouter()
  const updateUser = useUserStore(s => s.updateUser)

  return useMutation({
    mutationFn: checkApprovalStatus,
    onSuccess(res) {
      const { token, ...rest } = res
      setToken(token)
      updateUser(rest)
      router.replace("/")
    },
    onError(error) {
      toast(error.message)
    },
  })
}

export function useForgotPass() {
  const router = useRouter()

  return useMutation({
    mutationFn: forgotPass,
    onSuccess(res, variables) {
      const base = variables?.role === "user" ? "/auth" : `/auth/${variables?.role}`
      toast('Check your email')
      console.log(`${base}/forgot-pass`)
      router.replace(`${base}/reset-pass`)
    },
    onError(error) {
      toast('Failed to send password reset link', {
        description: error.message
      })
    },
  })
}

export function useResetPass() {
  const router = useRouter()

  return useMutation({
    mutationFn: resetPass,
    onSuccess(_, variables) {
      const base = variables?.role === "user" ? "/auth" : `/auth/${variables?.role}`
      toast('Password reset successfully')
      router.replace(`${base}/signin`)
    },
    onError(error) {
      toast('Password reset failed', {
        description: error.message
      })
    },
  })
}

export function useLogout() {
  const router = useRouter()
  const role = useUserStore(s => s.role)

  return useMutation({
    mutationFn: logout,
    onSuccess() {
      const base = role === "user" ? "/auth" : `/auth/${role}`
      removeToken()
      toast('Logged out successfully')
      router.replace(`${base}/signin`)
    },
    onError() {
      toast('Error on logging out')
    },
  })
}
