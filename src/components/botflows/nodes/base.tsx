import { PropsWithChildren, useState } from 'react';
import { Icons } from '@/components/ui/icons';
import { Card, CardContent } from '@/components';

import { CopyIcon, Ellipsis, Pencil, Trash2, X } from 'lucide-react';

import { Button } from '@/components';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import { useGlobalModalStateStore } from '@/store';
import { useBotPropertyStore } from '@/store/botfllow';
import { IBotNodeData } from '@/types';
import { useFlow } from '@/hooks';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib';
import { RenderSwitchForm } from '../form';

interface BaseLayoutProps extends PropsWithChildren {
  node: IBotNodeData;
  className?: string;
}

export const BaseLayout = ({ children, node, className }: BaseLayoutProps) => {
  const { data, selected } = node;
  const Icon = Icons[node.data.icon];

  const { botNodeData, setBotNodeData, setShowBotProperty, showBotProperty } =
    useBotPropertyStore();
  const [showNodeForm, setShowNodeForm] = useState(false);
  const handleToggleDrawer = () => {
    if (node.data) {
      setBotNodeData(null);
    }

    setShowBotProperty(true);
    setShowNodeForm(true)
    setBotNodeData(node);
  };
  const handleCloseModal = () => {
    setShowNodeForm(false);
    setBotNodeData(null);
  };

  const { onNodeDeleteClick, onNodeDuplicate } = useFlow();

  const handleDuplicate = () => {
    if (node) {
      onNodeDuplicate(node.id);
    }
  };

  return (
    <Card
      className={cn(
        'flex gap-4 flex-col py-4 rounded-3xl shadow-lg bg-white min-w-[300px] max-w-[350px] relative hover:ring-2 hover:ring-sky-500 transition-all duration-200',
        selected ? 'ring-2 ring-sky-500' : '',

        className
      )}
    >
      <CardContent className='pb-0 px-0 flex flex-col'>
        <div className='flex items-center gap-3 justify-between px-4'>
          {/* icon */}
          <Icon className='text-sky-500 size-7' />
          <div className='flex flex-col flex-1 mr-5'>
            <h3 className='text-lg text-gray-900 font-semibold'>
              {node?.data?.label}
            </h3>
            {node?.description && (
              <p className='text-gray-600 text-sm w-[150px]'>
                {node?.description}
              </p>
            )}
          </div>
          {/* Icons for Configure, Duplicate, and Delete */}
          <div className='flex items-center gap-3'>
            {node?.data && (
              <Dialog onOpenChange={setShowNodeForm} open={showNodeForm}>
                <DialogTrigger
                  onClick={handleToggleDrawer}
                  className='hover:text-gray-700 transition-all duration-200'
                >
                  <Pencil className='size-5 text-gray-500' />
                </DialogTrigger>
                <DialogContent
                  className={cn(
                    ' z-50',
                    node.type !== 'trigger'
                      ? 'sm:max-w-[525px] w-full'
                      : 'sm:max-w-[1025px] w-full'
                  )}
                >
                  <DialogHeader>
                    <DialogTitle className='flex items-center gap-2'>
                      {botNodeData?.data?.icon && <Icon className='size-5' />}
                      {botNodeData?.data?.label}
                    </DialogTitle>
                  </DialogHeader>
                  {botNodeData && <RenderSwitchForm onCloseModal={handleCloseModal} />}
                </DialogContent>
              </Dialog>
            )}

            {/* Ellipsis with Copy and Delete Buttons */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='ghost'
                  className='w-8 h-8 p-0 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-500 transition-all duration-200'
                  onMouseEnter={e => e.stopPropagation()}
                >
                  <Ellipsis className='h-5 w-5' />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align='end'
                side='right'
                sideOffset={5}
                className='p-2 z-50 max-w-[150px] bg-white border border-gray-300 shadow-lg rounded-lg'
              >
                <div className='flex flex-col gap-2'>
                  <button
                    onClick={handleDuplicate}
                    className='hover:text-gray-700 transition-all duration-200 flex items-center gap-2'
                  >
                    <CopyIcon className='size-4 text-gray-500' />
                    <span className='text-sm text-gray-700'>Duplicate</span>
                  </button>
                  {node?.type && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className='hover:text-red-700 transition-all duration-200 flex items-center gap-2'>
                          <Trash2 className='size-4 text-red-500' />
                          <span className='text-sm text-red-700'>Delete</span>
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete this building block and remove your data.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className='py-1 rounded-md'>
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className='py-1 rounded-md'
                            onClick={() => onNodeDeleteClick(node.id)}
                          >
                            Confirm
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
        {children && <div className='w-full px-4 py-2'>{children}</div>}
      </CardContent>
    </Card>
  );
};
