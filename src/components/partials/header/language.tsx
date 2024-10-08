"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, usePathname } from "next/navigation";
import { useGlobalStateStore } from "@/store";
import { getTranslation } from "@/i18n/i18n";

export const Language = () => {
  const router = useRouter();
  const {  languageList } = useGlobalStateStore();
 
 
  const {  i18n } = getTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" className="bg-transparent hover:bg-transparent">
          <span className="w-6 h-6 rounded-full me-1.5">
            <Image
                src={`/assets/images/flags/${i18n.language.toUpperCase()}.svg`}
              alt=""
              width={24}
              height={24}
              className="w-full h-full object-cover rounded-full"
            />
          </span>
          <span className="text-sm text-default-600 capitalize">
            {i18n.language ??  "En"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2">
        {languageList.map((item, index) => (
          <DropdownMenuItem
            key={`flag-${index}`}
            className={cn(
              "py-1.5 px-2 cursor-pointer dark:hover:bg-background mb-[2px] last:mb-0",
              {
                "bg-primary-100 ":
                i18n.language === item.code,
              }
            )}
            onClick={() => {
              i18n.changeLanguage(item.code);
              router.refresh();
            }}
          >
            <span className="w-6 h-6 rounded-full me-1.5">
              <Image
                src={`/assets/images/flags/${item.code.toUpperCase()}.svg`}
                alt=""
                width={24}
                height={24}
                className="w-full h-full object-cover rounded-full"
              />
            </span>
            <span className="text-sm text-default-600 capitalize">
              {item.name}
            </span>
            { i18n.language && i18n.language === item.code && (
              <Check className="w-4 h-4 flex-none ltr:ml-auto rtl:mr-auto text-default-700" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

