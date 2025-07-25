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
      toast('Account created successfully')
      router.push(`/auth/${variables?.role || "user"}/signin`)
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
      const { access_token: token, ...rest } = res
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
      const { access_token: token, ...rest } = res
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
    onSuccess(_, variables) {
      toast('Check your email')
      router.replace(`/auth/${variables?.role || "user"}/reset-pass`)
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
      toast('Password reset successfully')
      router.replace(`/auth/${variables?.role || "user"}/signin`)
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

  function onSuccess() {
    removeToken()
    toast('Logged out successfully')
    router.replace(`/auth/${role || "user"}/signin`)
  }

  return useMutation({
    mutationFn: logout,
    onSettled() {
      onSuccess()
    },
  })
}
