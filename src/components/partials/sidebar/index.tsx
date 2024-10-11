'use client';
import React from 'react';
import { useSidebar } from '@/store';
import { useMediaQuery } from '@/hooks/use-media-query';
import { MobileSidebar } from './mobile-sidebar';
import { PopoverSidebar } from './popover';


export const Sidebar = ({ trans }: { trans?: string }) => {
  const { sidebarType} = useSidebar();

  const isDesktop = useMediaQuery('(min-width: 1280px)');

  let selectedSidebar = null;

  if (!isDesktop && (sidebarType === 'popover')) {
    selectedSidebar = <MobileSidebar trans={trans} />;
  } else {
  

    selectedSidebar = <PopoverSidebar />;
  }

  return <div>{selectedSidebar}</div>;
};
