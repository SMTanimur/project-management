"use client"

import { ReactFlowProvider } from "@xyflow/react";



export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
     
        
        <ReactFlowProvider>
          <div className="relative">
            {children}
            {/* END CONTENT AREA */}
            </div>
            </ReactFlowProvider>
      
    </>
  );
}
