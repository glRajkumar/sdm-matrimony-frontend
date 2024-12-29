"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { forgotPass, login, resetPass, signup, } from "@/actions/user";
import { removeToken, setToken } from "@/actions/token";
import useUserStore from "@/store/user";

export function useSignup() {
  const router = useRouter()

  return useMutation({
    mutationFn: signup,
    onSuccess() {
      toast('Account created successfully')
      router.push("/signin")
    },
    onError(error) {
      toast('Signup failed', {
        description: error?.message
      })
    },
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

export function useForgotPass() {
  return useMutation({
    mutationFn: forgotPass,
    onSuccess() {
      toast('Check your email')
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
    onSuccess() {
      toast('Password reset successfully')
      router.replace("/signin")
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

  return useMutation({
    mutationFn: async () => true,
    onSuccess() {
      removeToken()
      toast('Logged out successfully')
      router.replace("/signin")
    },
    onError() {
      toast('Error on logging out')
    },
  })
}
