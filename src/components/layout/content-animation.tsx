'use client';

import { useGlobalStateStore } from '@/store/global-store';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const ContentAnimation = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
   const {animation}=useGlobalStateStore()
    return (
        <>
            {/* BEGIN CONTENT AREA */}
            <div className={`${animation} animate__animated p-6`}>{children}</div>
            {/* END CONTENT AREA */}
        </>
    );
};

export default ContentAnimation;
