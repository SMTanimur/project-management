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

interface MenuProps {
  isOpen: boolean | undefined;
}

export const Menu = ({ isOpen }: MenuProps) => {
  const pathname = usePathname();
  const menuList = getSidebarNavigation(pathname);

  return (
    <ScrollArea className='[&>div>div[style]]:!block'>
      <nav className='mt-8 h-full w-full'>
        <ul className='flex flex-col min-h-[calc(100vh-48px-36px-16px-32px)] lg:min-h-[calc(100vh-32px-40px-32px)] items-start space-y-1 px-2'>
          {menuList.map(({ title, icon, active, items }, index) => (
            <li className={cn('w-full', title ? 'pt-5' : '')} key={index}>
              {(isOpen && title) || isOpen === undefined ? (
                <p className='text-sm font-medium text-muted-foreground px-4 pb-2 max-w-[248px] truncate'>
                  {title}
                </p>
              ) : !isOpen && isOpen !== undefined && title ? (
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
                <p className='pb-2'></p>
              )}
              {items?.map(
                ({ href, title, icon, active, items: submenus }, index) => {
                  const Icon = icon ? Icons[icon as keyof typeof Icons] : null;
                  return (
                    <React.Fragment key={index}>
                      submenus?.length === 0 ? (
                      <div className='w-full' >
                        <TooltipProvider disableHoverableContent>
                          <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                              <Button
                                variant={active ? 'secondary' : 'ghost'}
                                className='w-full justify-start h-10 mb-1'
                                asChild
                              >
                                <Link href={href as string}>
                                  <span
                                    className={cn(
                                      isOpen === false ? '' : 'mr-4'
                                    )}
                                  >
                                    {Icon && <Icon size={18} />}
                                  </span>
                                  <p
                                    className={cn(
                                      'max-w-[200px] truncate',
                                      isOpen === false
                                        ? '-translate-x-96 opacity-0'
                                        : 'translate-x-0 opacity-100'
                                    )}
                                  >
                                    {title}
                                  </p>
                                </Link>
                              </Button>
                            </TooltipTrigger>
                            {isOpen === false && (
                              <TooltipContent side='right'>
                                {title}
                              </TooltipContent>
                            )}
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      ) : (
                      <div className='w-full' key={index}>
                        {' '}
                        <CollapseMenu
                          icon={Icon as any}
                          label={title as string}
                          active={active as boolean}
                          submenus={submenus as NavItemWithChildren[]}
                          isOpen={isOpen}
                        />
                      </div>
                      )
                    </React.Fragment>
                  );
                }
              )}
            </li>
          ))}
        </ul>
      </nav>
    </ScrollArea>
  );
};
