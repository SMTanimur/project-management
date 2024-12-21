'use client';
import React from 'react';
import { useMediaQuery } from '@/hooks/use-media-query';
import { MobileSidebar } from './mobile-sidebar';
import { PopoverSidebar } from './popover';

export const Sidebar = ({ trans }: { trans?: string }) => {
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  let selectedSidebar = null;

  if (!isDesktop) {
    selectedSidebar = <MobileSidebar trans={trans} />;
  } else {
    selectedSidebar = <PopoverSidebar />;
  }

  return <div>{selectedSidebar}</div>;
};
