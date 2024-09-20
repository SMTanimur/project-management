import ContentAnimation from '@/components/layout/content-animation';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import { MainContainer } from '@/components/layout/main-container';
import ScrollToTop from '@/components/layout/scroll-to-top';
import Setting from '@/components/layout/setting';
import Sidebar from '@/components/layout/sidebar';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* BEGIN MAIN CONTAINER */}
      <div className='relative'>
        <ScrollToTop />

        {/* BEGIN APP SETTING LAUNCHER */}
        <Setting />
        {/* END APP SETTING LAUNCHER */}

        <MainContainer>
          {/* END SIDEBAR */}
          <Sidebar />
          <div className=' main-content flex min-h-screen flex-col'>
           
            <Header />
            {/* END TOP NAVBAR */}

            {/* BEGIN CONTENT AREA */}
            <ContentAnimation>{children}</ContentAnimation>
            {/* END CONTENT AREA */}

            {/* BEGIN FOOTER */}
            <Footer />
          </div>
        </MainContainer>
      </div>
    </>
  );
}
