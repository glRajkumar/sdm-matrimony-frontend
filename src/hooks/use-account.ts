"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  checkApprovalStatus, forgotPass, login, logout, registerImage,
  resendVerifyEmail, resetPass, signup, verifyAccount,
  updateEmail, updateMobile, updatePassword, userDetailsMini,
} from "@/actions";
import { removeToken, setToken } from "@/actions/token";

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
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: login,
    onSuccess(res) {
      const { access_token: token, ...rest } = res
      setToken(token)
      toast('Logged in successfully')
      router.replace("/")
      queryClient.setQueryData(["user-details-mini"], rest)
    },
    onError(error) {
      toast('Login failed', {
        description: error.message
      })
    },
  })
}

export function useCheckApprovalStatus() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: checkApprovalStatus,
    onSuccess(res) {
      const { access_token: token, ...rest } = res
      setToken(token)
      router.replace("/")
      queryClient.setQueryData(["user-details-mini"], rest)
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

export function useVerifyAccount() {
  const queryClient = useQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: verifyAccount,
    onSuccess(res) {
      toast('Account verified successfully')
      router.replace(`/auth/${res?.role || "user"}/signin`)
      queryClient.invalidateQueries({ queryKey: ["account-info"] })
    },
    onError(error) {
      toast('Account verification failed', {
        description: error.message
      })
      router.replace("/")
    },
  })
}

export function useResendVerifyEmail() {
  return useMutation({
    mutationFn: resendVerifyEmail,
    onSuccess() {
      toast('Verification email sent successfully', {
        description: "Please check your email"
      })
    },
    onError(error) {
      toast('Failed to send verification email', {
        description: error.message
      })
    },
  })
}

export function useUpdatePassword() {
  return useMutation({
    mutationFn: updatePassword,
    onSuccess() {
      toast('Password updated successfully')
    },
    onError(error) {
      toast('Failed to update password', {
        description: error.message
      })
    },
  })
}

export function useUpdateMobile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateMobile,
    onSuccess() {
      toast('Mobile number updated successfully')
      queryClient.invalidateQueries({ queryKey: ["user-details-mini"] })
    },
    onError(error) {
      toast('Failed to update mobile number', {
        description: error.message
      })
    },
  })
}

export function useUpdateEmail() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateEmail,
    onSuccess() {
      toast('Email updated successfully', {
        description: "Please check your email to verify this email"
      })
      queryClient.invalidateQueries({ queryKey: ["user-details-mini"] })
    },
    onError(error) {
      toast('Failed to update email', {
        description: error.message
      })
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()
  const router = useRouter()

  function onSuccess() {
    const toUser = window.location.pathname.includes("user") ? "user" : "admin"
    removeToken()
    queryClient.clear()
    toast('Logged out successfully')
    router.replace(`/auth/${toUser}/signin`)
  }

  return useMutation({
    mutationFn: logout,
    onSettled() {
      onSuccess()
    },
  })
}

type miniT = Pick<userT, "_id" | "email" | "contactDetails" | "fullName" | "gender" | "isVerified"> & {
  currentPlan: currentPlanT
  unlockedCount: number
  role: rolesT
}
export function useUserDetailsMini() {
  return useQuery<miniT>({
    queryKey: ["user-details-mini"],
    queryFn: userDetailsMini,
  })
}
