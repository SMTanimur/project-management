'use client';

import { useGlobalStateStore } from '@/store';
import React from 'react';

export const MainContainer = ({ children }: { children: React.ReactNode }) => {
  const { openSidebar } = useGlobalStateStore();
  return (
    <div
      className={`main-container  min-h-screen text-black dark:text-white-dark ${
        openSidebar ? 'content-expanded' : 'content-collapsed'
      }`}
    >
      {' '}
      {children}
    </div>
  );
};
