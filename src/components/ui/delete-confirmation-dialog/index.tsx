'use client';
import React, { useTransition } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  Icons,
} from '@/components';
import { Loader2 } from 'lucide-react';

export const DeleteConfirmationDialog = ({
  open,
  onClose,
  onConfirm,
  cancel_text = 'Cancel',
  confirm_text = 'Confirm',
  description,
  title,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  cancel_text?: string;
  confirm_text?: string;
  onConfirm: () => void;
  defaultToast?: boolean;
  toastMessage?: string;
}) => {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = async () => {
    onConfirm();
    onClose();
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className='pt-3'>
        <div className='flex justify-end'>
          <AlertDialogCancel onClick={onClose}>
            <Icons.close className='size-6' />
          </AlertDialogCancel>
        </div>
         <div className='flex flex-col gap-4 items-center'>
          <div className='size-16  grid place-items-center  bg-red-300 rounded-full'>
            <Icons.trash className='text-red-600'/>
          </div>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          {description && (
            <AlertDialogDescription>{description}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>{cancel_text}</AlertDialogCancel>
          <AlertDialogAction
            className={isPending ? 'pointer-events-none' : ''}
            onClick={() => startTransition(handleConfirm)}
          >
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            {isPending ? 'deleting' : confirm_text}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
