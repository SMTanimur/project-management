


import { create } from "zustand";
import themeConfig from "../../theme.config";


interface ILanguage {
  code: string;
  name: string;

}
interface GlobalModalState {
  openSidebar: boolean;
  toggleSidebar: () => void;
  
  languageList:ILanguage[]
  animation:string
  setAnimation:(value:string)=>void

}
export const useGlobalStateStore = create<GlobalModalState>((set) => ({
  languageList:[
    { code: 'bd', name: 'Bangla' },
        { code: 'en', name: 'English' },
        { code: 'fr', name: 'French' },
        { code: 'ru', name: 'Russian' },
  ],
  animation:themeConfig.animation,
  openSidebar:false,
  toggleSidebar() {
      set((state) => ({ openSidebar: !state.openSidebar }));
  },
  setAnimation(value) {
    set({ animation: value });
  },

}));