import { persist } from "zustand/middleware";
import { create } from "zustand";

export interface User {
  _id: string;
  email: string;
  fullName: string;
  gender: string;
  role: string;
  mobile: string;
  isVerified: boolean;
}

interface Actions {
  updateUser: (payload: User) => void;
}

const useUserStore = create<User & Actions>()(persist(set => ({
  _id: "",
  email: "",
  fullName: "",
  gender: "",
  role: "",
  mobile: "",
  isVerified: false,

  updateUser: (payload) => set({ ...payload }),
}),
  {
    name: "user-storage",
  }
))

export default useUserStore;
