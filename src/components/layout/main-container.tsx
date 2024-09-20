'use client';

import { useGlobalStateStore } from '@/store';
import React from 'react';

export const MainContainer = ({ children }: { children: React.ReactNode }) => {

  return (
    <div className={`  min-h-screen text-black dark:text-white-dark `}>
      {' '}
      {children}
    </div>
  );
};
