"use client"
import { ReactFlowProvider } from "reactflow";


export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
     
        <div>
        <ReactFlowProvider>
            {children}
            {/* END CONTENT AREA */}

            </ReactFlowProvider>
      </div>
    </>
  );
}
