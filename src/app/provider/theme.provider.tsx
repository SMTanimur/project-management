"use client";

import { ReactFlowProvider } from "@xyflow/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
       <ReactFlowProvider>
     {children}
     </ReactFlowProvider>
    </NextThemesProvider>
  );
}