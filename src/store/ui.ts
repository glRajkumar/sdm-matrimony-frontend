import { create } from "zustand";
import { persist } from "zustand/middleware";

type State = {
  data: any;
  open: string;
  remindVerification: boolean;
};

type Actions = {
  update: (v: Partial<State>) => void;
  close: () => void;
};

const useUIStore = create<State & Actions>()(persist(set => ({
  open: "",
  data: null,
  remindVerification: true,

  update: (val) => set(val),
  close: () => set({ open: "", data: null }),
}),
  {
    name: "ui-store",
    partialize: s => ({ remindVerification: s.remindVerification }),
  }
))

export default useUIStore
