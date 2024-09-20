import Sidebar from "@/components/layout/sidebar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* BEGIN MAIN CONTAINER */}
      <div className='relative '>
         <Sidebar/>

   
          <div>

          
              {children}
              </div>
            {/* END CONTENT AREA */}

      </div>
    </>
  );
}
