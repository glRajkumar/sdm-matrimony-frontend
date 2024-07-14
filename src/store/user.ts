import { persist, createJSONStorage } from "zustand/middleware";
import { create } from "zustand";

export interface User{
  id: string,
  email: string,
  fullName: string,
  gender:string
}

interface Actions {
  updateUser: (payload: User) => void;
}

const useUserStore = create(
  persist<User & Actions>(
    (set) => ({
      id: '',
      email: '',
      fullName: '',
      gender: '',

      updateUser: (payload) => set({ ...payload }),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserStore