import { persist } from "zustand/middleware";
import { create } from "zustand";

type currentPlanT = {
  subscribedTo: string
  expiryDate: string
}

export type User = {
  _id: string
  email: string
  fullName: string
  gender: string
  role: string
  mobile: string
  isVerified: boolean
  currentPlan: currentPlanT
}

interface Actions {
  updateUser: (payload: User) => void
  updateCurrentPlan: (payload: currentPlanT) => void
}

const useUserStore = create<User & Actions>()(persist(set => ({
  _id: "",
  email: "",
  fullName: "",
  gender: "",
  role: "",
  mobile: "",
  isVerified: false,
  currentPlan: {
    subscribedTo: "",
    expiryDate: "",
  },

  updateUser: (payload) => set({ ...payload }),
  updateCurrentPlan: (currentPlan) => set({ currentPlan }),
}),
  {
    name: "user-storage",
  }
))

export default useUserStore
