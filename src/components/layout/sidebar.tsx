'use client';
import { useEffect, useState } from 'react';

import Nav from './nav';
import { cn } from '@/lib/utils';
import { Button } from '../ui';
import { ChevronsLeft, Menu, X } from 'lucide-react';
import { getSidebarNavigation, sidebarNavigation } from '@/configs';
import { useGlobalStateStore } from '@/store';

interface SidebarProps extends React.HTMLAttributes<HTMLElement> {}

export default function Sidebar({ className }: SidebarProps) {
  const [navOpened, setNavOpened] = useState(false);
  const { openSidebar, toggleSidebar } = useGlobalStateStore();
  /* Make body not scrollable when navBar is opened */
  useEffect(() => {
    if (navOpened) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }
  }, [navOpened]);

  return (
    <aside
      className={cn(
        `fixed left-0 right-0 bg-white  top-0 z-[99999] w-full border-r-2 border-r-muted transition-[width] md:bottom-0 md:right-auto md:h-svh ${
          openSidebar ? 'md:w-14' : 'md:w-64'
        }`,
        className
      )}
    >
      {/* Overlay in mobile */}
      <div
        onClick={() => setNavOpened(false)}
        className={`absolute inset-0 transition-[opacity] delay-100 duration-700 ${
          navOpened ? 'h-svh opacity-50' : 'h-0 opacity-0'
        } w-full bg-black md:hidden`}
      />

      <div>
        {/* Header */}
        <div className='z-50 flex justify-between px-4 py-3 shadow-sm md:px-4'>
          <div className={`flex items-center ${!openSidebar ? 'gap-2' : ''}`}>
           
         
          </div>

          {/* Toggle Button in mobile */}
          <Button
            variant='ghost'
            size='icon'
            className='md:hidden'
            aria-label='Toggle Navigation'
            aria-controls='sidebar-menu'
            aria-expanded={navOpened}
            onClick={() => setNavOpened(prev => !prev)}
          >
            {navOpened ? <X /> : <Menu />}
          </Button>
        </div>

        {/* Navigation links */}
        <Nav
          id='sidebar-menu'
          className={`z-40 h-full flex-1 overflow-auto ${
            navOpened ? 'max-h-screen' : 'max-h-0 py-0 md:max-h-screen md:py-2'
          }`}
          closeNav={() => setNavOpened(false)}
          isCollapsed={openSidebar}
          links={getSidebarNavigation}
        />

        {/* Scrollbar width toggle button */}
        <Button
          onClick={() => toggleSidebar()}
          size='icon'
          variant='outline'
          className='absolute -right-5 top-1/2 z-50 hidden rounded-full md:inline-flex'
        >
          <ChevronsLeft
            className={`h-5 w-5 ${openSidebar ? 'rotate-180' : ''}`}
          />
        </Button>
      </div>
    </aside>
  );
}
