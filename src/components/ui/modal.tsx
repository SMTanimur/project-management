'use client';

import { cn } from '@/lib/utils';
import {  Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import type { FC, ReactNode } from 'react';
import { Fragment, useCallback } from 'react';
import { Icons } from './icons';


interface ModalProps {
  icon?: ReactNode;
  title?: ReactNode;
  footer?: ReactNode;
  isAnimated?: boolean;
  animationType?: 'animate__slideInDown' | 'animate__fadeIn' | 'animate__fadeInUp' | 'animate__slideInUp' | 'animate__zoomInUp' | 'animate__fadeInRight' | 'animate__fadeInLeft' | 'animate__rotateInDownRight' | 'animate__rotateInDownLeft' | 'animate__fadeInLeft' | 'animate__fadeInRight' | 'animate__zoomInUp' | "scale";
  size?: 'xs' | 'sm' | 'md' | 'lg';
  show: boolean;
  children: ReactNode[] | ReactNode;
  dataTestId?: string;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({
  icon,
  title,
  size = 'sm',
  show,
  footer,
  isAnimated=true,
  animationType='scale',

  children,
  dataTestId = '',
  onClose,
}) => {
  const handleClose = useCallback(() => {
    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, 300);
  }, [onClose]);
  return (
    <Transition show={show}>
<Dialog onClose={handleClose} className="relative z-50">
      
   <TransitionChild
    enter="ease-out duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="ease-in duration-200"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
    <div className="fixed inset-0 bg-black/30" />
  </TransitionChild>
  <TransitionChild
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >

         <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
         <DialogPanel className={cn(
                { 'sm:max-w-5xl': size === 'lg' },
                { 'sm:max-w-3xl': size === 'md' },
                { 'sm:max-w-lg': size === 'sm' },
                { 'sm:max-w-sm': size === 'xs' },
                {'animate__animated' : isAnimated},
                
                `inline-block w-full scale-100 rounded-xl  bg-white text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:align-middle ${animationType === 'scale' ? 'scale-100' : animationType} `
              )}>

            {title && (
                <div className='divider flex items-center justify-between px-5 py-3.5'>
                  <div className='flex items-center space-x-2 font-bold'>
                    {icon}
                    <DialogTitle className="text-lg font-bold">{title}</DialogTitle>
                  </div>
                  {onClose ? (
                    <button
                      type='button'
                      className='rounded-full p-1 text-gray-800 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700'
                      onClick={onClose}
                    >
                      <Icons.close className='h-5 w-5' />
                    </button>
                  ) : null}
                </div>
              )}
              <div className='px-5'>
              {children}
              </div>

              {footer && (
                <div className='divider flex items-center justify-between px-5 py-3.5'>
                  <div className='flex items-center space-x-2 font-bold'>
                    <div>{footer}</div>
                  </div>
                </div>
              )}

      </DialogPanel>
    </div>
           
          </TransitionChild>
 
      </Dialog>
    </Transition>
  );
};
