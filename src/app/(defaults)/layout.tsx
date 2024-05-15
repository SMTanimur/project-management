import ContentAnimation from "@/components/layout/content-animation";
import Header from "@/components/layout/header";
import ScrollToTop from "@/components/layout/scroll-to-top";
import Setting from "@/components/layout/setting";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* BEGIN MAIN CONTAINER */}
      <div className="relative">
        {/* <Overlay /> */}
        <ScrollToTop />

        {/* BEGIN APP SETTING LAUNCHER */}
        <Setting />
        {/* END APP SETTING LAUNCHER */}

        <div>
          {/* END SIDEBAR */}
          <div className="main-content flex min-h-screen flex-col">
            {/* BEGIN TOP NAVBAR */}
            <Header />
            {/* END TOP NAVBAR */}

            {/* BEGIN CONTENT AREA */}
            <ContentAnimation>{children}</ContentAnimation>
            {/* END CONTENT AREA */}

            {/* BEGIN FOOTER */}
            {/* <Footer /> */}
          </div>
        </div>
      </div>
    </>
  );
}
