'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronDown, Dot, LucideIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { DropdownMenuArrow } from '@radix-ui/react-dropdown-menu';
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import {
  ISidebarNavigation,
  NavItemWithOptionalChildren,
} from '@/types/config';
import { isArray } from 'lodash';
import AnimateHeight from 'react-animate-height';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

interface CollapseMenuProps {
  icon?: LucideIcon;
  label: string;
  active: boolean;
  submenus: NavItemWithOptionalChildren[];
}

export const CollapseMenu = ({
  icon: Icon,
  label,
  active,
  submenus,
}: CollapseMenuProps) => {
  const isSubmenuActive = submenus?.some(submenu => submenu?.active);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(isSubmenuActive);

  return (
    <Collapsible
      open={isCollapsed}
      onOpenChange={setIsCollapsed}
      className='w-full'
    >
      <CollapsibleTrigger
        className='[&[data-state=open]>div>div>svg]:rotate-180 mb-1'
        asChild
      >
        <Button
          variant={active ? 'secondary' : 'ghost'}
          className='w-full justify-start h-10'
        >
          <div className='w-full items-center flex justify-between'>
            <div className='flex items-center'>
              <span className='mr-4'>{Icon && <Icon size={18} />}</span>
              <p
                className={cn(
                  'max-w-[150px] truncate',

                  'translate-x-0 opacity-100'
                )}
              >
                {label}
              </p>
            </div>
            <div
              className={cn('whitespace-nowrap', 'translate-x-0 opacity-100')}
            >
              <ChevronDown
                size={18}
                className='transition-transform duration-200'
              />
            </div>
          </div>
        </Button>
      </CollapsibleTrigger>
      <AnimateHeight duration={300} height={label ? 'auto' : 0}>
        <CollapsibleContent className='overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down'>
          {isArray(submenus) &&
            submenus.map(({ href, title, active }, index) => (
              <Button
                key={index}
                variant={active ? 'secondary' : 'ghost'}
                className='w-full justify-start h-10 mb-1'
                asChild
              >
                <Link href={href as string}>
                  <span className='mr-4 ml-2'>
                    <Dot size={18} />
                  </span>
                  <p
                    className={cn(
                      'max-w-[170px] truncate',
                      'translate-x-0 opacity-100'
                    )}
                  >
                    {title}
                  </p>
                </Link>
              </Button>
            ))}
        </CollapsibleContent>
      </AnimateHeight>
    </Collapsible>
  );
};
