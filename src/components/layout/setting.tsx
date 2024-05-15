'use client';
import { useState } from 'react';
import { Icons } from '../ui/icons';
import themeConfig from '../../../theme.config';
import { useGlobalStateStore } from '@/store/global-store';



const Setting = () => {
  

    const [showCustomizer, setShowCustomizer] = useState(false);
    const {setAnimation}=useGlobalStateStore()

    return (
        <div>
            <div className={`${(showCustomizer && '!block') || ''} fixed inset-0 z-[51] hidden bg-[black]/60 px-4 transition-[display]`} onClick={() => setShowCustomizer(false)}></div>

            <nav
                className={`${
                    (showCustomizer && '!right-0 ') || ''
                } fixed bottom-0 top-0 z-[51] w-full max-w-[400px] bg-white p-4 shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-[right] duration-300 -right-[400px]  dark:bg-black`}
            >
                <button
                    type="button"
                    className="absolute bottom-0 top-0 my-auto flex h-10 w-12 cursor-pointer items-center justify-center bg-primary text-white -left-12 rounded-bl-full rounded-tl-full   "
                    onClick={() => setShowCustomizer(!showCustomizer)}
                >
                    <Icons.settings className="h-5 w-5 animate-[spin_3s_linear_infinite]" />
                </button>

                <div className="perfect-scrollbar h-full overflow-y-auto overflow-x-hidden">
                    <div className="relative pb-5 text-center">
                        <button type="button" className="absolute top-0 opacity-30 hover:opacity-100 right-0  dark:text-white" onClick={() => setShowCustomizer(false)}>
                            <Icons.close className="h-5 w-5" />
                        </button>

                        <h4 className="mb-1 dark:text-white">TEMPLATE CUSTOMIZER</h4>
                        <p className="text-white-dark">Set preferences that will be cookied for your live preview demonstration.</p>
                    </div>

                    <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                        <h5 className="mb-1 text-base leading-none dark:text-white">Color Scheme</h5>
                        <p className="text-xs text-white-dark">Overall light or dark presentation.</p>
                        {/* <div className="mt-3 grid grid-cols-3 gap-2">
                            <button type="button" className={`${themeConfig.theme === 'light' ? 'btn-primary' : 'btn-outline-primary'} btn`} onClick={() => dispatch(toggleTheme('light'))}>
                                <IconSun className="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                Light
                            </button>

                            <button type="button" className={`${themeConfig.theme === 'dark' ? 'btn-primary' : 'btn-outline-primary'} btn`} onClick={() => dispatch(toggleTheme('dark'))}>
                                <IconMoon className="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                Dark
                            </button>

                            <button type="button" className={`${themeConfig.theme === 'system' ? 'btn-primary' : 'btn-outline-primary'} btn`} onClick={() => dispatch(toggleTheme('system'))}>
                                <IconLaptop className="h-5 w-5 shrink-0 ltr:mr-2 rtl:ml-2" />
                                System
                            </button>
                        </div> */}
                    </div>

                   

                    <div className="mb-3 rounded-md border border-dashed border-white-light p-3 dark:border-[#1b2e4b]">
                        <h5 className="mb-1 text-base leading-none dark:text-white">Router Transition</h5>
                        <p className="text-xs text-white-dark">Animation of main content.</p>
                        <div className="mt-3">
                            <select className="form-select border-primary text-primary" value={themeConfig.animation} onChange={(e) => setAnimation(e.target.value)}>
                                <option value=" ">None</option>
                                <option value="animate__fadeIn">Fade</option>
                                <option value="animate__fadeInDown">Fade Down</option>
                                <option value="animate__fadeInUp">Fade Up</option>
                                <option value="animate__fadeInLeft">Fade Left</option>
                                <option value="animate__fadeInRight">Fade Right</option>
                                <option value="animate__slideInDown">Slide Down</option>
                                <option value="animate__slideInLeft">Slide Left</option>
                                <option value="animate__slideInRight">Slide Right</option>
                                <option value="animate__zoomIn">Zoom In</option>
                            </select>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Setting;
