import React from "react";
import { cn } from "@/lib/utils";
export const FooterLayout = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <footer className={cn("bg-card relative py-4 px-6  border-t", className)}>
      {children}
    </footer>
  );
};

