import {
  DashboardHeader,
  ScrollToTop,
  Setting,
  TooltipProvider,
} from '@/components';
import { ReactNode } from 'react';


export default async function Layout({ children }: { children: ReactNode }) {

  return (
    <div className='relative '>
      <ScrollToTop />

      {/* BEGIN APP SETTING LAUNCHER */}
      <Setting />
      <DashboardHeader isSearch={false} isVerticalHeader={false} />
      <TooltipProvider>
      
            {children}
    
      
      </TooltipProvider>
    </div>
  );
}
