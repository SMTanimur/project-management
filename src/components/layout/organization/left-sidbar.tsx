'use client';

import { Card, Icons } from '@/components';
import { organizationConfig } from '@/configs';
import { cn } from '@/lib';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export const LefSidebar = () => {
  const pathname = usePathname();
  return (
    <Card className='max-w-64 w-full h-[calc(100vh-65px)] flex flex-col gap-4 pt-6 rounded-none bg-gray-200 px-4'>
      {organizationConfig.map(item => {
        const Icon = Icons[item.Icon];
        return (
          <Link
            href={item.href}
            key={item.title}
            className={cn(
              'flex items-center gap-2 p-2 rounded-md hover:bg-gray-100',
              pathname === item.href && 'bg-gray-100'
            )}
          >
            <Icon className='w-6 h-6' />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </Card>
  );
};
