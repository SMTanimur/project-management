import { cn } from '@/lib/utils';

import { sidebarNavigation } from '@/configs';

import { useNodeId } from 'reactflow';
import { useState } from 'react';
import { useBot } from '@/hooks';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Icons } from '@/components/ui/icons';
import { Input } from '@/components/ui/input';


interface IHandleClickMenuProps {
  className?: string;
}
export const HandleClickMenu = ({ className }: IHandleClickMenuProps) => {
  const { addNodeClick} = useBot();
  const nodeId = useNodeId();
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(' flex justify-between items-center gap-2 ml-1 ', className)}
    >
      <Popover {...{ open, onOpenChange: setOpen }}>
        <PopoverTrigger asChild>
          <button className='bg-sky-500 p-1 hover:scale-110 hover:shadow-md transition duration-200 rounded-full text-white z-50'>
            <Icons.plus />
          </button>
        </PopoverTrigger>
        <PopoverContent
          className='w-96 ml-10 -mt-12 bg-gray-800 border-none'
          align='start'
        >
          <div className='flex flex-col gap-2'>
            <h2 className='text-xl text-white'>Type to Search</h2>
            <div className='relative'>
              <Input
                className='w-full p-2 placeholder:text-gray-600'
                placeholder='Type the name of feature'
              />
              <Icons.search className='absolute top-2 right-2 text-gray-600' />
            </div>

            <div className='flex flex-col gap-4 items-start justify-start  mt-3 h-[270px] overflow-y-auto'>
              {sidebarNavigation.map((item, index) => (
                <div key={index} className='w-full'>
                  <h3 className='text-lg text-gray-600 font-bold'>
                    {item.label}
                  </h3>
                  <div className='flex flex-col gap-2 w-full'>
                    {item.children.map((item, index) => {
                      const Icon = Icons[item.icon ?? 'chevronLeft'];
                      return (
                        <div
                          key={index}
                          className='mt-1 px-2 py-3  flex items-center justify-between hover:bg-gray-700 gap-4 w-full hover:shadow-md transition-all duration-300 cursor-grab'
                          onClick={() => {
                            addNodeClick(item, nodeId as string);
                            setOpen(false);
                          }}
                        >
                          <div className=' flex items-center gap-4 w-full'>
                            <div
                              className={cn('px-1.5 py-1 rounded-md border')}
                            >
                              <Icon className='text-gray-500 size-4' />
                            </div>
                            <h6 className='text-white text-lg'>{item.label}</h6>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
