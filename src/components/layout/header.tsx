/* eslint-disable @next/next/no-img-element */
'use client';

import { useGlobalStateStore } from '@/store/global-store';
import { LogoutOutlined, MailOutlined, MenuOutlined, SearchOutlined, UserAddOutlined } from '@ant-design/icons';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Dropdown from '../ui/dropdown';


const Header = () => {
    const pathname = usePathname();

    const router = useRouter();
  const{toggleSidebar} =  useGlobalStateStore ()

    useEffect(() => {
        const selector = document.querySelector('ul.horizontal-menu a[href="' + window.location.pathname + '"]');
        if (selector) {
            const all: any = document.querySelectorAll('ul.horizontal-menu .nav-link.active');
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

  
   

    
    

    const [search, setSearch] = useState(false);

    return (
        <header className={`z-40  `}>
            <div className="shadow-sm">
                <div className="relative flex w-full items-center bg-white px-5 py-2.5 ">
                    <div className="horizontal-logo flex items-center justify-between lg:hidden mr-2 ">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                        
                            <span className="hidden align-middle text-2xl  font-semibold  transition-all duration-300  md:inline ml-1.5">Project</span>
                        </Link>
                        <button
                            type="button"
                            className="collapse-icon flex flex-none rounded-full bg-white-light/40 p-2 hover:bg-white-light/90 hover:text-primary   dark:hover:text-primary lg:hidden ml-2 "
                            onClick={() => toggleSidebar}
                        >
                            <MenuOutlined className="h-5 w-5" />
                        </button>
                    </div>

                 
                    <div className="flex items-center space-x-1.5  sm:flex-1 lg:space-x-2 ml-auto sm:ml-0 rtl:mr-auto  ">
                        <div className="sm:mr-auto ">
                            <form
                                className={`${search && '!block'} absolute inset-x-0 top-1/2 z-10 mx-4 hidden -translate-y-1/2 sm:relative sm:top-0 sm:mx-0 sm:block sm:translate-y-0`}
                                onSubmit={() => setSearch(false)}
                            >
                                <div className="relative">
                                    <input
                                        type="text"
                                        className="peer form-input bg-gray-100 placeholder:tracking-widest sm:bg-transparent pl-9 pr-9 sm:pr-4   "
                                        placeholder="Search..."
                                    />
                                    <button type="button" className="absolute inset-0 h-9 w-9 appearance-none peer-focus:text-primary right-auto ">
                                        <SearchOutlined className="mx-auto" />
                                    </button>
                                    <button type="button" className="absolute top-1/2 block -translate-y-1/2 hover:opacity-80 sm:hidden right-2 " onClick={() => setSearch(false)}>
                                       
                                    </button>
                                </div>
                            </form>
                           
                        </div>
                        
                        <div className="dropdown flex shrink-0">
                            <Dropdown
                                offset={[0, 8]}
                                placement={`${ 'bottom-end' }`}
                                btnClassName="relative group block"
                                button={<img className="h-9 w-9 rounded-full object-cover saturate-50 group-hover:saturate-100" src="/assets/images/user-profile.jpeg" alt="userProfile" />}
                            >
                                <ul className="w-[280px] mt-3 py-3 font-semibold text-dark bg-white px-4 rounded-lg">
                                    <li>
                                        <div className="flex items-center px-4 py-4">
                                            <img className="h-10 w-10 rounded-md object-cover" src="/assets/images/user-profile.jpeg" alt="userProfile" />
                                            <div className="truncate pl-4 ">
                                                <h4 className="text-base">
                                                    John Doe
                                                    <span className="rounded bg-success-light px-1 text-xs text-success ml-2 ">Pro</span>
                                                </h4>
                                                <button type="button" className="text-black/60 hover:text-primary ">
                                                    johndoe@gmail.com
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <Link href="/dashboard" className="">
                                            <UserAddOutlined className="h-4.5 w-4.5 shrink-0 mr-2 " />
                                            Dashboard
                                        </Link>
                                    </li>
                            
                                    
                                    <li className="border-t border-white-light dark:border-white-light/10">
                                        <Link href="/auth/boxed-signin" className="!py-3 text-danger">
                                            <LogoutOutlined className="h-4.5 w-4.5 shrink-0 rotate-90 mr-2 " />
                                            Sign Out
                                        </Link>
                                    </li>
                                </ul>
                            </Dropdown>
                        </div>
                    </div>
                </div>

               
            </div>
        </header>
    );
};

export default Header;
