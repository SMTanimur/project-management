'use client';
import React from 'react';
import { cn } from '@/lib/utils';
import { useSidebar, useThemeStore } from '@/store';
import { useMediaQuery } from '@/hooks/use-media-query';

import { ThemeButton } from '../theme-button';
import { ProfileInfo } from '../profile-info';
import { Inbox } from '../inbox';
import { NotificationMessage } from '../notification-message';
import { VerticalHeader } from '../vertical-header';
import { Language } from '../language';
import { ClassicHeader } from '../classic-header';
import { useUser } from '@/hooks';
import { Button } from '@/components/ui';
import Link from 'next/link';

export const NavTools = ({
  isDesktop,
  isMobile,
  sidebarType,
}: {
  isDesktop: boolean;
  isMobile: boolean;
  sidebarType: string;
}) => {
  const { data } = useUser();
  return (
    <div className='nav-tools flex items-center  gap-2'>
      {isDesktop && <Language />}

      <ThemeButton />
      <Inbox />
      <NotificationMessage />

      <div className=' pr-2'>
        {data ? (
          <ProfileInfo />
        ) : (
          <Button variant='outline'>
            <Link href='/auth/login'>Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
export const DashboardHeader = ({
  handleOpenSearch,
  isVerticalHeader = true,

  trans,
}: {
  handleOpenSearch?: () => void;
  trans?: string;
  isVerticalHeader?: boolean;
  isSearch?: boolean;
}) => {
  const { collapsed, sidebarType, setSidebarType } = useSidebar();
  const { layout, navbarType } = useThemeStore();

  const isDesktop = useMediaQuery('(min-width: 1280px)');

  const isMobile = useMediaQuery('(min-width: 768px)');

  // set header style to classic if isDesktop
  React.useEffect(() => {
    if (!isDesktop && layout === 'horizontal') {
      setSidebarType('classic');
    }
  }, [isDesktop]);

  if (navbarType !== 'hidden') {
    return (
      <ClassicHeader
        className={cn('', {
          'xl:ml-[248px] ': !collapsed,
          'xl:ml-[72px] ': collapsed,
          '!ml-[0px] ': !isVerticalHeader,
          'sticky top-0': navbarType === 'sticky',
        })}
      >
        <div className='w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 border-b'>
          <div className='flex justify-between items-center h-full'>
            {isVerticalHeader ? (
              <VerticalHeader
                handleOpenSearch={handleOpenSearch || (() => {})}
              />
            ) : (
              <div></div>
            )}
            <NavTools
              isDesktop={isDesktop}
              isMobile={isMobile}
              sidebarType={sidebarType}
            />
          </div>
        </div>
      </ClassicHeader>
    );
  }
  if (navbarType === 'hidden') {
    return null;
  }

  return (
    <ClassicHeader
      className={cn('', {
        'xl:ml-[300px] ': !collapsed,
        'xl:ml-[72px] ': collapsed,

        'sticky top-0': navbarType === 'sticky',
      })}
    >
      <div className='w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 border-b'>
        <div className='flex justify-between items-center h-full'>
          {isVerticalHeader ? (
            <VerticalHeader
              handleOpenSearch={handleOpenSearch || (() => {})}
            />
          ) : (
            <div></div>
          )}
          <NavTools
            isDesktop={isDesktop}
            isMobile={isMobile}
            sidebarType={sidebarType}
          />
        </div>
      </div>
    </ClassicHeader>
  );
};
