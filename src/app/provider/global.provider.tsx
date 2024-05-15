
"use client"

import { useGlobalStateStore } from "@/store/global-store";



export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
    const {openSidebar}=useGlobalStateStore()
 
  return (
    <div className={`${openSidebar ? "toggle-sidebar" :""}`}>
      {children}
     
    </div>
  );
};