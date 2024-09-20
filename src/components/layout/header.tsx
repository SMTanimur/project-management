/* eslint-disable @next/next/no-img-element */
'use client';

import { getTranslation } from '@/i18n/i18n';
import { useGlobalStateStore } from '@/store/global-store';

import {
  AlignJustify,
  Bell,
  BellIcon,
  Edit2Icon,
  Info,
  LayoutDashboardIcon,
  MailIcon,
  MenuIcon,
  NotebookIcon,
  PencilIcon,
  XIcon,
} from 'lucide-react';

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';
import { Icons } from '../ui/icons';
import Sidebar from './sidebar';
import { useUser } from '@/hooks/useUser';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { useAuth } from '@/hooks/useAuth';

const Header = () => {
  const pathname = usePathname();
  const { toggleSidebar, openSidebar, languageList } = useGlobalStateStore();

  const router = useRouter();
  const { t, i18n } = getTranslation();
  const { profile } = useUser();
  const { logout } = useAuth();
  const { data, isPending } = profile;
  useEffect(() => {
    const selector = document.querySelector(
      'ul.horizontal-menu a[href="' + window.location.pathname + '"]'
    );
    if (selector) {
      const all: any = document.querySelectorAll(
        'ul.horizontal-menu .nav-link.active'
      );
      for (let i = 0; i < all.length; i++) {
        all[0]?.classList.remove('active');
      }

      let allLinks = document.querySelectorAll('ul.horizontal-menu a.active');
      for (let i = 0; i < allLinks.length; i++) {
        const element = allLinks[i];
        element?.classList.remove('active');
      }
      selector?.classList.add('active');

      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link');
        if (ele) {
          ele = ele[0];
          setTimeout(() => {
            ele?.classList.add('active');
          });
        }
      }
    }
  }, [pathname]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      image:
        '<span class="grid place-content-center w-9 h-9 rounded-full bg-success-light dark:bg-success text-success dark:text-success-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg></span>',
      title: 'Congratulations!',
      message: 'Your OS has been updated.',
      time: '1hr',
    },
    {
      id: 2,
      image:
        '<span class="grid place-content-center w-9 h-9 rounded-full bg-info-light dark:bg-info text-info dark:text-info-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></span>',
      title: 'Did you know?',
      message: 'You can switch between artboards.',
      time: '2hr',
    },
    {
      id: 3,
      image:
        '<span class="grid place-content-center w-9 h-9 rounded-full bg-danger-light dark:bg-danger text-danger dark:text-danger-light"> <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></span>',
      title: 'Something went wrong!',
      message: 'Send Reposrt',
      time: '2days',
    },
    {
      id: 4,
      image:
        '<span class="grid place-content-center w-9 h-9 rounded-full bg-warning-light dark:bg-warning text-warning dark:text-warning-light"><svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">    <circle cx="12" cy="12" r="10"></circle>    <line x1="12" y1="8" x2="12" y2="12"></line>    <line x1="12" y1="16" x2="12.01" y2="16"></line></svg></span>',
      title: 'Warning',
      message: 'Your password strength is low.',
      time: '5days',
    },
  ]);

  const removeMessage = (value: number) => {
    setMessages(messages.filter(user => user.id !== value));
  };

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      profile: 'user-profile.jpeg',
      message:
        '<strong class="text-sm mr-1">John Doe</strong>invite you to <strong>Prototyping</strong>',
      time: '45 min ago',
    },
    {
      id: 2,
      profile: 'profile-34.jpeg',
      message:
        '<strong class="text-sm mr-1">Adam Nolan</strong>mentioned you to <strong>UX Basics</strong>',
      time: '9h Ago',
    },
    {
      id: 3,
      profile: 'profile-16.jpeg',
      message: '<strong class="text-sm mr-1">Anna Morgan</strong>Upload a file',
      time: '9h Ago',
    },
  ]);

  const removeNotification = (value: number) => {
    setNotifications(notifications.filter(user => user.id !== value));
  };

  return (
    <header className={`z-10 horizontal `}>
      <div className='shadow-sm w-full bg-white'>
        <div className='relative w-full py-2.5 dark:bg-black flex  justify-between '>
          <div className='flex items-center'>
            <div className=' flex items-center justify-between  mr-2 '>
              <Link href='/' className='main-logo flex shrink-0 items-center'>
                <span className='hidden align-middle text-2xl  font-semibold  transition-all duration-300 dark:text-white-light md:inline ml-1.5 '>
                  SMTR
                </span>
              </Link>
              {!openSidebar && (
                <button
                  onClick={() => toggleSidebar()}
                  className='hidden lg:block'
                >
                  <MenuIcon className='h-5 w-5' />
                </button>
              )}
            </div>
          </div>
          <div className='flex items-center space-x-1.5 dark:text-[#d0d2d6]  lg:space-x-5  sm:ml-0   '>
            {/* them setup */}
            <div className='shrink-0 '>
              <Menu>
                <MenuButton className='flex items-center bg-white-light/50 hover:bg-white-light px-2 py-2 rounded-full'>
                  {i18n.language && (
                    <img
                      className='h-5 w-5 rounded-full object-cover'
                      src={`/assets/images/flags/${i18n.language.toUpperCase()}.svg`}
                      alt='flag'
                    />
                  )}
                </MenuButton>
                <Transition
                  enter='transition ease-out duration-75'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <MenuItems
                    anchor='bottom end'
                    className='w-[320px] !z-40 px-4 py-3 origin-top-right rounded-xl border  bg-white p-1 text-sm/6 dark:text-white  text-dark [--anchor-gap:var(--spacing-1)] focus:outline-none mt-3 '
                  >
                    <ul className='grid w-[280px] grid-cols-2 gap-2 !px-2 font-semibold text-dark dark:text-white-dark dark:text-white-light/90'>
                      {languageList.map((item: any) => {
                        return (
                          <li key={item.code}>
                            <button
                              type='button'
                              className={`flex w-full hover:text-primary ${
                                i18n.language === item.code
                                  ? 'bg-primary/10 text-primary px-2 py-1 rounded-md'
                                  : ''
                              }`}
                              onClick={() => {
                                i18n.changeLanguage(item.code);
                                router.refresh();
                              }}
                            >
                              <img
                                src={`/assets/images/flags/${item.code.toUpperCase()}.svg`}
                                alt='flag'
                                className='h-5 w-5 rounded-full object-cover'
                              />
                              <span className='ml-3 '>
                                {item ? item.name : languageList[0].name}
                              </span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
            <div className='dropdown shrink-0'>
              <Menu>
                <MenuButton className='bg-white-light/50 hover:bg-white-light px-2 py-2 rounded-full'>
                  <MailIcon />
                </MenuButton>
                <Transition
                  enter='transition ease-out duration-75'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <MenuItems
                    anchor='bottom end'
                    className='w-[320px] origin-top-right rounded-xl border  bg-white p-1 text-sm/6 dark:text-white  text-dark [--anchor-gap:var(--spacing-1)] focus:outline-none mt-3 z-20'
                  >
                    <MenuItem>
                      <button className='group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-white/10'>
                        <PencilIcon className='size-4 fill-white/30' />
                        Edit
                        <kbd className='ml-auto hidden font-sans text-xs text-white/50 group-data-[focus]:inline'>
                          ⌘E
                        </kbd>
                      </button>
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
            <div className='relative shrink-0'>
              <Menu>
                <MenuButton className='bg-white-light/50 hover:bg-white-light px-2 py-2 rounded-full'>
                  <span>
                    <BellIcon />
                    <span className='absolute top-0 flex h-3 w-3 right-0 '>
                      <span className='absolute -top-[3px] inline-flex h-full w-full animate-ping rounded-full bg-success/50 opacity-75 -left-[3px] '></span>
                      <span className='relative inline-flex h-[6px] w-[6px] rounded-full bg-success'></span>
                    </span>
                  </span>
                </MenuButton>
                <Transition
                  enter='transition ease-out duration-75'
                  enterFrom='opacity-0 scale-95'
                  enterTo='opacity-100 scale-100'
                  leave='transition ease-in duration-100'
                  leaveFrom='opacity-100 scale-100'
                  leaveTo='opacity-0 scale-95'
                >
                  <MenuItems
                    anchor='bottom end'
                    className='max-w-[370px]  mt-3 origin-top-right rounded-xl border  bg-white p-1 text-sm/6 dark:text-white  text-gray-900 [--anchor-gap:var(--spacing-1)] focus:outline-none relative z-20'
                  >
                    <ul className=' divide-y !py-0 text-dark dark:divide-white/10 dark:text-white-dark sm:w-[350px]'>
                      <li onClick={e => e.stopPropagation()}>
                        <div className='flex items-center justify-between px-4 py-2 font-semibold'>
                          <h4 className='text-lg'>Notification</h4>
                          {notifications.length ? (
                            <Badge>{notifications.length}New</Badge>
                          ) : (
                            ''
                          )}
                        </div>
                      </li>
                      {notifications.length > 0 ? (
                        <>
                          {notifications.map(notification => {
                            return (
                              <li
                                key={notification.id}
                                className='dark:text-white-light/90'
                                onClick={e => e.stopPropagation()}
                              >
                                <div className='group flex items-center px-4 py-2'>
                                  <div className='grid place-content-center rounded'>
                                    <div className='relative h-12 w-12'>
                                      <img
                                        className='h-12 w-12 rounded-full object-cover'
                                        alt='profile'
                                        src={`/assets/images/${notification.profile}`}
                                      />
                                      <span className='absolute bottom-0 right-[6px] block h-2 w-2 rounded-full bg-success'></span>
                                    </div>
                                  </div>
                                  <div className='flex flex-auto pl-3 '>
                                    <div className='pr-3 '>
                                      <h6
                                        dangerouslySetInnerHTML={{
                                          __html: notification.message,
                                        }}
                                      ></h6>
                                      <span className='block text-xs font-normal dark:text-gray-500'>
                                        {notification.time}
                                      </span>
                                    </div>
                                    <button
                                      type='button'
                                      className='text-neutral-300 opacity-0 hover:text-danger group-hover:opacity-100 ml-auto '
                                      onClick={() =>
                                        removeNotification(notification.id)
                                      }
                                    >
                                      <XIcon />
                                    </button>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                          <li>
                            <div className='p-4'>
                              <Button className='block w-full rounded-lg'>
                                Read All Notifications
                              </Button>
                            </div>
                          </li>
                        </>
                      ) : (
                        <li onClick={e => e.stopPropagation()}>
                          <button
                            type='button'
                            className='!grid min-h-[200px] place-content-center text-lg hover:!bg-transparent'
                          >
                            <div className='mx-auto mb-4 rounded-full ring-4 ring-primary/30'>
                              <Info className='h-10 w-10 text-primary' />
                            </div>
                            No data available.
                          </button>
                        </li>
                      )}
                    </ul>
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
            <div className='dropdown flex shrink-0'>
              {data ? (
                <DropdownMenu>
                  <DropdownMenuTrigger className='focus:outline-none'>
                    <Avatar>
                      <AvatarImage src={data.avatar} />
                      <AvatarFallback>{data.firstName}</AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className='w-[150px] '>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href='/profile'>{t('profile')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href='/botflows'>botflows</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link href='/settings'>{t('settings')}</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <button onClick={() => logout()}>{t('logout')}</button>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant={'outline'} size={'default'}>
                  <Link href='/auth/login'>{t('login')}</Link>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
