import React from 'react';
import { useSidebar, useThemeStore } from '@/store';
import { cn } from '@/lib';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useMediaQuery } from '@/hooks/use-media-query';

const MenuBar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}) => {
  return (
    <button
      className='relative group  disabled:cursor-not-allowed opacity-50'
      onClick={() => setCollapsed(!collapsed)}
    >
      <div>
        <div
          className={cn(
            'flex flex-col justify-between w-[20px] h-[16px] transform transition-all duration-300 origin-center overflow-hidden',
            {
              '-translate-x-1.5 rotate-180': collapsed,
            }
          )}
        >
          <div
            className={cn(
              'bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150',
              {
                'rotate-[42deg] w-[11px]': collapsed,
                'w-7': !collapsed,
              }
            )}
          ></div>
          <div
            className={cn(
              'bg-card-foreground h-[2px] w-7 rounded transform transition-all duration-300',
              {
                'translate-x-10': collapsed,
              }
            )}
          ></div>
          <div
            className={cn(
              'bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150',
              {
                '-rotate-[43deg] w-[11px]': collapsed,
                'w-7': !collapsed,
              }
            )}
          ></div>
        </div>
      </div>
    </button>
  );
};

type VerticalHeaderProps = {
  handleOpenSearch: () => void;
  isSearch?: boolean;
  isVerticalHeader?: boolean;
};
export const VerticalHeader: React.FC<VerticalHeaderProps> = ({
  handleOpenSearch,
  isSearch = true,
  isVerticalHeader = true,
}) => {
  const { collapsed, setCollapsed } = useSidebar();
  const isDesktop = useMediaQuery('(min-width: 1280px)');
  const isMobile = useMediaQuery('(min-width: 768px)');

  let searchButtonContent = null;

  const SearchButton = (
    <div>
      <button
        type='button'
        className=' inline-flex  gap-2 items-center text-default-600 text-sm'
        onClick={handleOpenSearch}
      >
        <span>
          <Search className=' h-4 w-4' />
        </span>
        <span className=' md:block hidden'> Search...</span>
      </button>
    </div>
  );

  if (isMobile) {
    searchButtonContent = SearchButton;
  }
  

  return (
    <>
      <div className='flex items-center md:gap-6 gap-3'>
        {isDesktop && (
          <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
        )}

        {!isSearch && searchButtonContent}
      </div>
    </>
  );
};
