'use client';

import {
  Badge,
  Button,
  Avatar,
  AvatarFallback,
  AvatarImage,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components';
import { cn } from '@/lib';
import { Icon } from '@iconify/react';

import { Menu } from 'lucide-react';
import { useMediaQuery } from '@/hooks';
import { IUser } from '@/types';
import { TooltipArrow } from '@radix-ui/react-tooltip';

export const MessageHeader = ({
  showInfo,
  handleShowInfo,
  profile,
  mblChatHandler,
}: {
  showInfo: boolean;
  handleShowInfo: () => void;
  profile: IUser;
  mblChatHandler: () => void;
}) => {
  console.log({profile})
  let active = profile?.connection_status === 'online'
  const isLg = useMediaQuery('(max-width: 1024px)');

  return (
    <div className='flex  items-center'>
      <div className='flex flex-1 gap-3 items-center'>
        {isLg && (
          <Menu
            className=' h-5 w-5 cursor-pointer text-default-600'
            onClick={mblChatHandler}
          />
        )}
        <div className='relative inline-block'>
          <Avatar>
            <AvatarImage src={profile?.avatar} alt='' />
            <AvatarFallback>
              {profile?.firstName?.slice(1)}, {profile?.lastName?.slice(1)}
            </AvatarFallback>
            :
          </Avatar>
          <Badge
            className=' h-3 w-3  p-0 ring-1 ring-border ring-offset-[1px]   items-center justify-center absolute left-[calc(100%-12px)] top-[calc(100%-12px)]'
            color={active ? 'success' : 'secondary'}
          ></Badge>
        </div>
        <div className='hidden lg:block'>
          <div className='text-sm font-medium text-default-900 '>
            <span className='relative'>
              {profile?.firstName} {profile?.lastName}
            </span>
          </div>
          <span className='text-xs text-default-500'>
            {active ? 'Active Now' : 'Offline'}
          </span>
        </div>
      </div>
      <div className='flex-none space-x-2 rtl:space-x-reverse'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type='button'
              size='icon'
              className='bg-transparent rounded-full hover:bg-default-50'
            >
              <span className='text-xl text-primary'>
                <Icon icon='solar:phone-linear' />
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom' align='end'>
            <p>Start a voice call</p>
            <TooltipArrow className='fill-primary' />
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type='button'
              size='icon'
              className='bg-transparent rounded-full hover:bg-default-50'
            >
              <span className='text-xl text-primary'>
                <Icon icon='mdi:video-outline' />
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom' align='end'>
            <p>Start a video call</p>
            <TooltipArrow className='fill-primary' />
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type='button'
              size='icon'
              className={cn('bg-transparent hover:bg-default-50 rounded-full', {
                'text-primary': !showInfo,
              })}
              onClick={handleShowInfo}
            >
              <span className='text-xl text-primary '>
                {showInfo ? (
                  <Icon icon='material-symbols:info' />
                ) : (
                  <Icon icon='material-symbols:info-outline' />
                )}
              </span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom' align='end'>
            <p>Conversation information</p>
            <TooltipArrow className='fill-primary' />
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};
