'use client';

import { cn } from '@/lib/utils';
import { useGlobalStateStore } from '@/store/global-store';
import { PanelsTopLeft } from 'lucide-react';
import Link from 'next/link';

import { Menu } from './menu';

const Sidebar = () => {
  const { openSidebar, toggleSidebar } = useGlobalStateStore();

  return (
    <div className=''>
      <nav
        className={cn(
          ' fixed bottom-0 top-0 z-[999] bg-white h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300',
          openSidebar ? 'translate-x-0' : 'translate-x-[-260px]'
        )}
      >
        <div className='relative h-full flex flex-col px-3 py-4 overflow-y-auto shadow-md dark:shadow-zinc-800'>
          <div className='flex justify-between text-primary items-center'>
            <h3>SMTR</h3>

            <button onClick={() => toggleSidebar()}>
              <PanelsTopLeft size={24} />
            </button>
          </div>
          <Menu />
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
