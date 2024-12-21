'use client';

import { useGlobalStateStore } from '@/store/global-store';

import React from 'react';


export const ContentAnimation = ({ children }: { children: React.ReactNode }) => {
   const {animation}=useGlobalStateStore()
    return (
        <>
            {/* BEGIN CONTENT AREA */}
            <div className={`${animation} animate__animated p-6`}>{children}</div>
            {/* END CONTENT AREA */}
        </>
    );
};

