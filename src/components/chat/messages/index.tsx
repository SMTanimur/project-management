import React, { useState } from 'react';
import { formatTime } from '@/lib/utils';
import { Icon } from '@iconify/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Undo2 } from 'lucide-react';

import Image from 'next/image';
import { IChat, IChatMember, IMessage, IUser } from '@/types';
import { ChatType } from '@/types/chat/chat.enum';
import { Avatar, AvatarFallback } from '@/components/ui';
import { AvatarImage } from '@radix-ui/react-avatar';
const chatAction = [
  {
    label: 'Remove',
    link: '#',
  },
  {
    label: 'Forward',
    link: '#',
  },
];

interface MessagesProps {
  message: IMessage;
  profile: IUser;
  onDelete: (selectedChatId: any, index: number) => void;
  index: number;
  selectedChatId: string;
  handleReply: (data: any, sender: IMessage) => void;
  replayData: any;
  handleForward: (data: any) => void;
  handlePinMessage: (data: any) => void;
  pinnedMessages: IMessage[];
}
export const Messages = ({
  message,
  profile,
  onDelete,
  index,
  selectedChatId,
  handleReply,
  replayData,
  handleForward,

  handlePinMessage,
  pinnedMessages,
}: MessagesProps) => {
  const { sender, content, createdAt, replyTo } = message;

  const { avatar } = sender as IUser;
  // State to manage pin status
  const isMessagePinned = pinnedMessages.some(
    (pinnedMessage: any) => pinnedMessage.index === index
  );

  const handlePinMessageLocal = (note: any) => {
    const obj = {
      note,
      avatar,
      index,
    };
    handlePinMessage(obj);
  };

  return (
    <>
      <div className='block md:px-6 px-0 '>
       
        {sender._id === profile._id ? (
          <>
            {replyTo && (
              <div className='w-max ml-auto -mb-2 mr-10'>
                <div className='flex items-center gap-1 mb-1'>
                  <Undo2 className='w-4 h-4 text-default-600' />{' '}
                  <span className='text-xs text-default-700'>
                    You replied to
                    <span className='ml-1 text-default-800'>
                      {replayData?.sender?.fullName}
                    </span>
                  </span>
                </div>
                <p className='truncate text-sm bg-default-200 rounded-2xl px-3 py-2.5'>
                  {replayData?.message}
                </p>
              </div>
            )}
            <div className='flex space-x-2 items-start justify-end group w-full rtl:space-x-reverse mb-4'>
              <div className=' flex flex-col  gap-1'>
                <div className='flex items-center gap-1'>
                  <div className='opacity-0 invisible group-hover:opacity-100 group-hover:visible '>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <span className='w-7 h-7 rounded-full bg-default-200 flex items-center justify-center'>
                          <Icon
                            icon='bi:three-dots-vertical'
                            className='text-lg'
                          />
                        </span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className='w-20 p-0'
                        align='center'
                        side='top'
                      >
                        <DropdownMenuItem
                          onClick={() => onDelete(selectedChatId, index)}
                        >
                          Delete
                        </DropdownMenuItem>
                        <DropdownMenuItem>Forward</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className='whitespace-pre-wrap break-all'>
                    <div className='bg-primary/70 text-primary-foreground  text-sm  py-2 px-3 rounded-2xl  flex-1  '>
                      {content}
                    </div>
                  </div>
                </div>
                <span className='text-xs text-end text-default-500'>
                  {formatTime(createdAt)}
                </span>
              </div>
              <div className='flex-none self-end -translate-y-5'>
                <Avatar className='size-8'>
                  <AvatarImage src={profile?.avatar} alt='' />
                  <AvatarFallback>
                    {profile?.firstName?.slice(1)},{' '}
                    {profile?.lastName?.slice(1)}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </>
        ) : (
          <div className='flex space-x-2 items-start group rtl:space-x-reverse mb-4'>
            <div className='flex-none self-end -translate-y-5'>
              <Avatar className='size-8'>
                <AvatarImage src={profile?.avatar} alt='' />
                <AvatarFallback>
                  {profile?.firstName?.slice(1)}, {profile?.lastName?.slice(1)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className='flex-1 flex flex-col gap-2'>
              <div className='flex flex-col   gap-1'>
                <div className='flex items-center gap-1'>
                  <div className='whitespace-pre-wrap break-all relative z-[1]'>
                    {isMessagePinned && (
                      <Icon
                        icon='ion:pin-sharp'
                        className=' w-5 h-5 text-destructive  absolute left-0 -top-3 z-[-1]  transform -rotate-[30deg]'
                      />
                    )}

                    <div className='bg-default-200  text-sm  py-2 px-3 rounded-2xl  flex-1  '>
                      {content}
                    </div>
                  </div>
                  <div className='opacity-0 invisible group-hover:opacity-100 group-hover:visible '>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <span className='w-7 h-7 rounded-full bg-default-200 flex items-center justify-center'>
                          <Icon
                            icon='bi:three-dots-vertical'
                            className='text-lg'
                          />
                        </span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className='w-20 p-0'
                        align='center'
                        side='top'
                      >
                        <DropdownMenuItem
                          onClick={() => onDelete(selectedChatId, index)}
                        >
                          Remove
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleReply(content, sender as any)}
                        >
                          Reply
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handlePinMessageLocal(content)}
                        >
                          {isMessagePinned ? 'Unpin' : 'Pin'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleForward(content)}
                        >
                          Forward
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                <span className='text-xs   text-default-500'>
                  {formatTime(createdAt)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
