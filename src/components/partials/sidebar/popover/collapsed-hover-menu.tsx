"use client";
import React, { useState } from "react";

import { cn, isLocationMatch, getDynamicPath } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { MultiMenuHandler, MultiNestedMenu, SubMenuItem } from "../common";
import { MenuItemProps } from "@/configs";
import { Icons } from "@/components/ui";

export const CollapsedHoverMenu = ({ item, menuTitle, trans }: {
  item: MenuItemProps

  menuTitle?: string
  trans: any
}) => {
  const [activeMultiMenu, setMultiMenu] = useState<number | null>(null);

  const toggleMultiMenu = (subIndex: number) => {
    if (activeMultiMenu === subIndex) {
      setMultiMenu(null);
    } else {
      setMultiMenu(subIndex);
    }
  };

  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);

  const Icon = item.icon ? Icons[item.icon] : null;
  return (
    <>
      {item?.child ? (
        <ul className="space-y-2 relative before:absolute before:left-4 before:top-0  before:h-[calc(100%-5px)]  before:w-[2px] before:bg-primary/20 before:rounded">
          <li className=" text-primary-foreground bg-primary font-medium px-3 py-3 rounded  relative flex items-center gap-3 ">
            {Icon && <Icon className="w-5 h-5" />}
            {menuTitle}
          </li>
          {item.child?.map((subItem: any, j: number) => (
            <li
              className={cn(
                "relative block ml-10 first:pt-4  before:absolute first:before:top-4 before: top-0 before:-left-6  before:w-[2px]  before:h-0 before:transition-all before:duration-200",
                {
                  "before:bg-primary first:before:h-[calc(100%-16px)]  before:h-full":
                    isLocationMatch(subItem.href, locationName),
                }
              )}
              key={`sub_menu_${j}`}
            >
              {subItem?.multi_menu ? (
                <div>
                  <MultiMenuHandler
                    subItem={subItem}
                    subIndex={j}
                    activeMultiMenu={activeMultiMenu}
                    toggleMultiMenu={toggleMultiMenu}
                    className="before:-left-6"
                    trans={trans}
                  />
                  <div className="pl-3">
                    <MultiNestedMenu
                      subItem={subItem}
                      subIndex={j}
                      activeMultiMenu={activeMultiMenu}
                      trans={trans}
                    />
                  </div>
                </div>
              ) : (
                <SubMenuItem subItem={subItem} trans={trans} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div>no menu</div>
      )}
    </>
  );
};


