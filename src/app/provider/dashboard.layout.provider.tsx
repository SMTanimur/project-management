"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useSidebar, useThemeStore } from "@/store";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { useMediaQuery, useMounted } from "@/hooks";
import {DashboardHeader, Footer, LayoutLoader, Sidebar } from "@/components";
import { MobileSidebar } from "@/components/partials/sidebar/mobile-sidebar";
const DashBoardLayoutProvider = ({ children }: { children: React.ReactNode}) => {
  const { collapsed, sidebarType, setCollapsed, subMenu } = useSidebar();
  const [open, setOpen] = React.useState(false);
  const { layout } = useThemeStore();
  const location = usePathname();
  const isMobile = useMediaQuery("(min-width: 768px)");
  const mounted = useMounted();
  if (!mounted) {
    return <LayoutLoader />;
  }
  
  if (layout === "horizontal") {
    return (
      <>
        <DashboardHeader handleOpenSearch={() => setOpen(true)} />

        <div className={cn("content-wrapper transition-all duration-150 ")}>
          <div
            className={cn(
              "  pt-6 px-6 pb-8  page-min-height-horizontal ",
              {}
            )}
          >
            <LayoutWrapper
              isMobile={isMobile}
              setOpen={setOpen}
              open={open}
              location={location}
            
            >
              {children}
            </LayoutWrapper>
          </div>
        </div>
        <Footer handleOpenSearch={() => setOpen(true)} />
        {/* <ThemeCustomize /> */}
      </>
    );
  }

  
  return (
    <>
      <DashboardHeader handleOpenSearch={() => setOpen(true)}  />
      <Sidebar  />

      <div
        className={cn("content-wrapper transition-all duration-150 ", {
          "xl:ml-[300px] ": !collapsed,
          "xl:ml-[72px] ": collapsed,
        })}
      >
        <div
          className={cn(
            " layout-padding px-6 pt-6  page-min-height ",

          )}
        >
          <LayoutWrapper
            isMobile={isMobile}
            setOpen={setOpen}
            open={open}
            location={location}
          
          >
            {children}
          </LayoutWrapper>
        </div>
      </div>
      <Footer handleOpenSearch={() => setOpen(true)} />
      {/* {isMobile && <ThemeCustomize />} */}
    </>
  );
};

export default DashBoardLayoutProvider;

const LayoutWrapper = ({ children, isMobile, setOpen, open, location, trans }: { children: React.ReactNode, isMobile: boolean, setOpen: any, open: boolean, location: any, trans?: any }) => {
  return (
    <>
      <motion.div
        key={location}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
            y: 50,
          },
          pageAnimate: {
            opacity: 1,
            y: 0,
          },
          pageExit: {
            opacity: 0,
            y: -50,
          },
        }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.5,
        }}
      >
        <main>{children}</main>
      </motion.div>

      <MobileSidebar  className="left-[300px]" />
      {/* <HeaderSearch open={open} setOpen={setOpen} /> */}
    </>
  );
};
