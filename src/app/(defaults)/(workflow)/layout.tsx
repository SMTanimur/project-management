"use client";

import React, { PropsWithChildren } from "react";
import { ReactFlowProvider } from "reactflow";

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <ReactFlowProvider>
      <main className="">
      
      
         {children}
       
      </main>
    </ReactFlowProvider>
  );
};

export default DashboardLayout;
