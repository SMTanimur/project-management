
import { useSidebar } from '@/store';
import React from 'react';

export const SidebarLogo = ({ hovered }: { hovered?: boolean }) => {

  const { sidebarType, setCollapsed, collapsed } = useSidebar();

  return (
    <div className='px-4 py-[22px] border-b '>
      <div className=' flex items-center'>
        <div className='flex flex-1 items-center gap-x-3  '>SMTR</div>
        <div className="flex-none lg:block hidden">
           
          </div>
      </div>
    </div>
  );
};
