import { DashboardHeader, LefSidebar, ScrollToTop, Setting } from '@/components';
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className='relative '>
    <ScrollToTop />

    {/* BEGIN APP SETTING LAUNCHER */}
    <Setting />
    <DashboardHeader isSearch={false} isVerticalHeader={false} />
    
    <div className=' px-10 md:px-28 xl:px-48'>
      
      {/* <LefSidebar /> */}
      <div className='flex-1'>{children}</div>
    </div>
    </div>
  );
}
