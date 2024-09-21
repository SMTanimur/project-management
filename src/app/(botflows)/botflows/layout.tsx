import { ContentAnimation, Header, ScrollToTop } from "@/components";



export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* BEGIN MAIN CONTAINER */}
      <div className="relative">

        <ScrollToTop />
        <div>
          {/* END SIDEBAR */}
          <div className="main-content flex min-h-screen flex-col">
        
            {/* BEGIN TOP NAVBAR */}
            <Header />
            {/* END TOP NAVBAR */}

            {/* BEGIN CONTENT AREA */}
            <ContentAnimation>{children}</ContentAnimation>
            {/* END CONTENT AREA */}

          </div>
        </div>
      </div>
    </>
  );
}
