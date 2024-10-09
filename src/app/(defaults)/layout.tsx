import { ContentAnimation, ScrollToTop, Setting } from '@/components';
import DashBoardLayoutProvider from '../provider/dashboard.layout.provider';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* BEGIN MAIN CONTAINER */}
      <div className='relative bg-[--]'>
        <ScrollToTop />

        {/* BEGIN APP SETTING LAUNCHER */}
        <Setting />
        {/* END APP SETTING LAUNCHER */}

        <DashBoardLayoutProvider>
          {/* BEGIN CONTENT AREA */}
          <ContentAnimation>{children}</ContentAnimation>
          {/* END CONTENT AREA */}
        </DashBoardLayoutProvider>
      </div>
    </>
  );
}
