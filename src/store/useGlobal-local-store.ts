import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';



interface GlobalLocalState {
   currentOrganizationId:string | null

  setGlobalStore: (
    updater:
      | Partial<GlobalLocalState>
      | ((prevState: GlobalLocalState) => Partial<GlobalLocalState>)
  ) => void;

}


export const useGlobalLocalStateStore = create(
  persist<GlobalLocalState>(
    (set) => ({
      currentOrganizationId: null,
      setGlobalStore: (updater) => {
        set((state) => ({
          ...state,
          ...(typeof updater === "function" ? updater(state) : updater),
        }));
      },
    }),
    {
      name: "global-local-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);