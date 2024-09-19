'use client';

import Link from 'next/link';
import { Ellipsis, LogOut } from 'lucide-react';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

import { cn } from '@/lib/utils';
import { getSidebarNavigation } from '@/configs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import React from 'react';
import { Icons } from '@/components/ui/icons';
import { CollapseMenu } from '../CollapseMenu';
import { NavItemWithChildren } from '@/types/config';

export const Menu = () => {
  const pathname = usePathname();
  const menuList = getSidebarNavigation(pathname);

  return (
    <ScrollArea className='[&>div>div[style]]:!block'>
      <nav className='mt-8 h-full w-full'>
        <ul className='flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] z-[999999] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2'>
          {menuList.map(({ title, icon, active, items }, index) => {
            const ParentIcon = icon ? Icons[icon as keyof typeof Icons] : null;
            return (
              <li className={cn('w-full', title ? 'pt-2' : '')} key={index}>
                {items?.length === 0 ? (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger className='w-full'>
                        <div className='w-full flex justify-center items-center'>
                          <Ellipsis className='h-5 w-5' />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side='right'>
                        <p>{title}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ) : (
                  <div className='w-full' key={index}>
                    {' '}
                    <CollapseMenu
                      icon={ParentIcon as any}
                      label={title as string}
                      active={active as boolean}
                      submenus={items as NavItemWithChildren[]}
                    />
                  </div>
                )}
               
              </li>
            );
          })}
        </ul>
      </nav>
    </ScrollArea>
  );
};
