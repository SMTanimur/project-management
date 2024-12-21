import {
  DashboardHeader,
  LefSidebar,
  ScrollToTop,
  Setting,
  TooltipProvider,
} from '@/components';
import { ReactNode } from 'react';
import { LayoutWrap } from './components';
import { cookies } from 'next/headers';

export default async function Layout({ children }: { children: ReactNode }) {
  const layout = cookies().get('react-resizable-panels:layout');
  const collapsed = cookies().get('react-resizable-panels:collapsed');
  const defaultLayout = layout ? JSON.parse(layout.value) : undefined;
  let defaultCollapsed;

  try {
    // Check if collapsed and collapsed.value exist and are valid JSON strings
    if (
      collapsed &&
      typeof collapsed.value === 'string' &&
      collapsed.value.trim() !== ''
    ) {
      defaultCollapsed = JSON.parse(collapsed.value);
    } else {
      defaultCollapsed = undefined; // Fallback if the value is empty or not a string
    }
  } catch (error) {
    // Fallback in case of JSON parsing error
    defaultCollapsed = undefined;
    console.error(
      "Failed to parse collapsed value. Please check if it's a valid JSON string:",
      error
    );
  }
  return (
    <div className='relative '>
      <ScrollToTop />

      {/* BEGIN APP SETTING LAUNCHER */}
      <Setting />
      <DashboardHeader isSearch={false} isVerticalHeader={false} />
      <TooltipProvider>
        <div className='flex'>
          <LayoutWrap
            defaultLayout={defaultLayout}
            defaultCollapsed={defaultCollapsed}
            navCollapsedSize={4}
          >
            {children}
          </LayoutWrap>
        </div>
      </TooltipProvider>
    </div>
  );
}
