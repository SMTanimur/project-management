


import { create } from "zustand";


interface GlobalModalState {
  openSidebar: boolean;
  toggleSidebar: () => void;

}
export const useGlobalStateStore = create<GlobalModalState>((set) => ({
  openSidebar:false,
  toggleSidebar() {
      set((state) => ({ openSidebar: !state.openSidebar }));
  },

}));