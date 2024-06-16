"use client";


import { create } from "zustand";


interface GlobalModalState {
  openModal: boolean;
  onOpenModal: () => void;
  oncloseModal: () => void;
botflowModalIsOpen: boolean;
setBotflowModal:(open:boolean)=>void;


}
export const useGlobalModalStateStore = create<GlobalModalState>((set) => ({
  openModal: false,
  onOpenModal: () => set(() => ({ openModal: true })),
  oncloseModal: () => set(() => ({ openModal: false })),
  botflowModalIsOpen: false,
  setBotflowModal:(open:boolean)=>set(()=>({botflowModalIsOpen:open})),
  
}));
