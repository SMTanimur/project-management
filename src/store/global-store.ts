


import { create } from "zustand";


interface ILanguage {
  code: string;
  name: string;

}
interface GlobalModalState {
  openSidebar: boolean;
  toggleSidebar: () => void;
  languageList:ILanguage[]


}
export const useGlobalStateStore = create<GlobalModalState>((set) => ({
  languageList:[
    { code: 'bd', name: 'Bangla' },
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'French' },
        { code: 'ru', name: 'Russian' },
  ],
  openSidebar:false,
  toggleSidebar() {
      set((state) => ({ openSidebar: !state.openSidebar }));
  },

}));