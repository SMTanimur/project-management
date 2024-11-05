'use client';

import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { IOrganizationConfig } from '@/configs';
import { Icons } from '@/components';

interface NavProps {
  isCollapsed: boolean;
  handleSidebar?: () => void;
  links: IOrganizationConfig[];
}
export function Nav({ links, isCollapsed, handleSidebar }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className='group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2'
    >
      <nav className='grid gap-1  group-[[data-collapsed=true]]:justify-center '>
        {links.map((link, index) => {
          const Icon = Icons[link.Icon as keyof typeof Icons];
          return isCollapsed ? (
            <Tooltip key={index} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link href={link.href ?? "#"} className={cn()}>
                  <Icon
                    className={cn(
                      'w-[18px] h-[18px] mb-2 flex-none text-default-600',
                      {
                        'text-primary': false,
                      }
                    )}
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent
                side='right'
                className='flex items-center gap-4 capitalize'
              >
                {link.title}
                {link.label && <span>{link.label}</span>}
              </TooltipContent>
            </Tooltip>
          ) : (
            <button
              onClick={handleSidebar}
              key={`link-${index}`}
              className={cn(
                'flex items-center gap-1.5 py-2.5 px-3 cursor-pointer group/item capitalize hover:bg-primary/10 rounded ease-in-out duration-200',
                {
                  'bg-primary/10': false,
                }
              )}
            >
              <span className='flex gap-2 items-center '>
                <Icon
                  
                  className={cn(
                    'w-4 h-4 flex-none group-hover/item:text-primary-600 text-default-600 ease-in-out duration-150',
                    {
                      'text-primary': false,
                    }
                  )}
                />
                <span
                  className={cn(
                    'flex-1 capitalize text-sm font-medium group-hover/item:text-primary-600 text-default-600 ease-in-out duration-150',
                    {
                      'text-primary': false,
                    }
                  )}
                >
                  {link.title}
                </span>
              </span>
              {link.label && (
                <span
                  className={cn(
                    'flex-1 text-end text-sm font-medium group-hover/item:text-primary-600 text-default-600 ease-in-out duration-150',
                    {
                      'text-primary': false,
                    }
                  )}
                >
                  {link.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
