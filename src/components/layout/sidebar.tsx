"use client";

import { getTranslation } from "@/i18n/i18n";
import { cn } from "@/lib/utils";
import { useGlobalStateStore } from "@/store/global-store";
import {
  Contact,
  LayoutDashboard,
  MailIcon,
  MessageCircleIcon,
  Minus,
  Notebook,
  NotebookIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
import PerfectScrollbar from "react-perfect-scrollbar";
import { DrawerClose } from "../ui/drawer";
import { Icons } from "../ui/icons";

const Sidebar = () => {
  const { t } = getTranslation();
  const pathname = usePathname();
  const [currentMenu, setCurrentMenu] = useState<string>("");


  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      selector.classList.add("active");
      const ul: any = selector.closest("ul.sub-menu");
      if (ul) {
        let ele: any =
          ul.closest("li.menu").querySelectorAll(".nav-link") || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    
  }, [pathname]);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll(".sidebar ul a.active");
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove("active");
    }
    const selector = document.querySelector(
      '.sidebar ul a[href="' + window.location.pathname + '"]'
    );
    selector?.classList.add("active");
  };

  return (
    <div>
      <nav
        className={cn(
          "sidebar  z-50 h-full min-h-screen w-full shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300  "
        )}
      >
        <div className="h-full">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/" className="main-logo flex shrink-0 items-center">
              <span className="align-middle text-2xl font-semibold dark:text-white-light lg:inline ml-1.5 ">
                SMTR
              </span>
            </Link>

            <DrawerClose>
              <button
                type="button"
                className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 dark:text-white-light dark:hover:bg-dark-light/10 "
              
              >
                <Icons.chevronLeft className="m-auto " />
              </button>
            </DrawerClose>
          </div>
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "dashboard" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("dashboard")}
                >
                  <div className="flex items-center">
                    <Icons.home className="shrink-0 group-hover:!text-primary" />
                    <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark pl-3 ">
                      {t("dashboard")}
                    </span>
                  </div>

                  <div
                    className={currentMenu !== "dashboard" ? "-rotate-90 " : ""}
                  >
                    <Icons.chevronDown />
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "dashboard" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <Link href="/">{t("sales")}</Link>
                    </li>
                    <li>
                      <Link href="/analytics">{t("analytics")}</Link>
                    </li>
                    <li>
                      <Link href="/finance">{t("finance")}</Link>
                    </li>
                    <li>
                      <Link href="/crypto">{t("crypto")}</Link>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>

              <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                <Icons.close className="hidden h-5 w-4 flex-none" />
                <span>{t("apps")}</span>
              </h2>

              <li className="nav-item">
                <ul>
                  <li className="nav-item">
                    <Link href="/apps/chat" className="group">
                      <div className="flex items-center">
                        <MessageCircleIcon className="shrink-0 group-hover:!text-primary" />
                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark pl-3 ">
                          {t("chat")}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/apps/mailbox" className="group">
                      <div className="flex items-center">
                        <MailIcon className="shrink-0 group-hover:!text-primary" />
                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark pl-3 ">
                          {t("mailbox")}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/apps/todolist" className="group">
                      <div className="flex items-center">
                        <Notebook className="shrink-0 group-hover:!text-primary" />
                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark pl-3 ">
                          {t("todo_list")}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/apps/notes" className="group">
                      <div className="flex items-center">
                        <NotebookIcon className="shrink-0 group-hover:!text-primary" />
                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark pl-3 ">
                          {t("notes")}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/apps/scrumboard" className="group">
                      <div className="flex items-center">
                        <LayoutDashboard className="shrink-0 group-hover:!text-primary" />
                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 ">
                          {t("scrumboard")}
                        </span>
                      </div>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/apps/contacts" className="group">
                      <div className="flex items-center">
                        <Contact className="shrink-0 group-hover:!text-primary" />
                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 ">
                          {t("contacts")}
                        </span>
                      </div>
                    </Link>
                  </li>
                </ul>
              </li>

              <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                <Minus className="hidden h-5 w-4 flex-none" />
                <span>{t("user_and_pages")}</span>
              </h2>

              <li className="menu nav-item">
                <button
                  type="button"
                  className={`${
                    currentMenu === "users" ? "active" : ""
                  } nav-link group w-full`}
                  onClick={() => toggleMenu("users")}
                >
                  <div className="flex items-center">
                    <Icons.user className="shrink-0 group-hover:!text-primary" />
                    <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark pl-3 ">
                      {t("users")}
                    </span>
                  </div>

                  <div className={currentMenu !== "users" ? "-rotate-90 " : ""}>
                    <Icons.chevronDown />
                  </div>
                </button>

                <AnimateHeight
                  duration={300}
                  height={currentMenu === "users" ? "auto" : 0}
                >
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <Link href="/users/profile">{t("profile")}</Link>
                    </li>
                    <li>
                      <Link href="/users/user-account-settings">
                        {t("account_settings")}
                      </Link>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
