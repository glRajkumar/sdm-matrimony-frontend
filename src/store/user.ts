import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  fullName: string;
  gender: string;
  role: string;
  approval_required: string;
}

interface Actions {
  updateUser: (payload: User) => void;
}

const useUserStore = create(
  persist<User & Actions>(
    (set) => ({
      id: "",
      email: "",
      fullName: "",
      gender: "",
      role: "",
      approval_required: "",
      updateUser: (payload) => set({ ...payload }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore;
