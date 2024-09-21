'use client';

import { useGlobalStateStore } from "@/store/global-store";


export const Overlay = () => {
  
    const {openSidebar,toggleSidebar}=useGlobalStateStore()
    return (
        <>
            {/* sidebar menu overlay */}
            <div className={`${(!openSidebar && 'hidden') || ''} fixed inset-0 z-50 bg-black/60 lg:hidden`} onClick={() => toggleSidebar()}></div>
        </>
    );
};

