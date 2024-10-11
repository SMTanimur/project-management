"use client";
import React from "react";
import Link from "next/link";
import { useSidebar } from "@/store";
import { Button } from "@/components/ui";
import { Home, Menu, Search } from "lucide-react";

export const MobileFooter = ({ handleOpenSearch }: { handleOpenSearch: () => void }) => {
  const { mobileMenu, setMobileMenu } = useSidebar();
  return (
    <footer className="bg-card bg-no-repeat   shadow-[0_-4px_29px_#9595952b] dark:shadow-[0_-4px_29px_#000000cc] footer-bg  border-t dark:border-none flex justify-around items-center backdrop-filter backdrop-blur-[40px] fixed left-0 w-full z-50 bottom-0 py-[12px] px-4">
      <Button
 
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 hover:bg-primary-100 dark:hover:bg-default-300 hover:text-primary text-default-500 dark:text-default-800  rounded-full "
      >
        <Search className="h-5 w-5 " />
      </Button>
      <div className="relative shadow-[0_-4px_10px_#9595952b] dark:shadow-[0_-4px_10px_#0000004d] bg-card border-t dark:border-none bg-no-repeat backdrop-filter backdrop-blur-[40px] rounded-full footer-bg  h-[70px] w-[70px] z-[-1] -mt-[40px] flex justify-center items-center">
        <div className="rounded-full bg-primary p-3 h-[60px] w-[60px] flex items-center justify-center  relative left-0 top-0 custom-dropshadow  text-center">
        <button
        onClick={() => setMobileMenu(!mobileMenu)}
        className="text-white"
       
      >
        <Menu className="h-5 w-5 " />
      </button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
       <Link href={"/"}>
        <Home className="size-5"/>
       
       </Link>
       
      </div>
    </footer>
  );
};
