'use client';
import React, { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { Annoyed, SendHorizontal } from 'lucide-react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Input,
  Label,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipTrigger,
} from '@/components';
import { useChat } from '@/hooks';
import { ChatEvent, MessageType } from '@/types';
import { TCreateMessage } from '@/validations';
import { useSocket } from '@/app/provider/socketContext';

interface MessageFooterProps {
  handleSendMessage: (message: string) => void;
  replay: boolean;
  chatId: string;
  setReply: React.Dispatch<React.SetStateAction<boolean>>;
  replayData: any; // You can replace 'any' with a more specific type if available
}

export const MessageFooter: React.FC<MessageFooterProps> = ({
  handleSendMessage,
  replay,
  setReply,
  chatId,
  replayData,
}) => {
  const [message, setMessage] = useState<string>('');
  const { handleTyping,isTyping,sendMessage,manageTyping} = useChat(chatId);
  const {socket}=useSocket()
  let typingTimeout: NodeJS.Timeout; // Define typingTimeout with the correct type

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    manageTyping()
    setMessage(e.target.value);
    e.target.style.height = 'auto'; // Reset the height to auto to adjust
    e.target.style.height = `${e.target.scrollHeight - 15}px`;
    console.log("message",socket)
 
    handleTyping(message.length > 0)// Notify that the user is typing
      // playTypingSound();
   

    // Reset typing state after a delay
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      handleTyping(false); // Notify that the user stopped typing
    }, 1000); // Adjust the delay as needed
  };

  const playTypingSound = () => {
    const audio = new Audio('/path/to/typing-sound.mp3'); // Replace with your audio file path
    audio.play();
  };

  const handleSelectEmoji = (emoji: any) => {
    setMessage(prevMessage => prevMessage + emoji.native);
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message) return;

  await sendMessage({ content: message, messageType: MessageType.TEXT }as TCreateMessage)
    setReply(false);
    setMessage('');
    handleTyping(false); // Notify that the user is no longer typing
  };

  console.log({isTyping})

  return (
    <>
      {replay && (
        <div className='w-full px-6 py-4 flex justify-between gap-4 items-center'>
          <div>
            <div className='font-semibold text-base text-default-700 mb-1'>
              Replying to {replayData?.contact?.fullName}
            </div>
            <div className='truncate'>
              <span className='text-sm text-muted-foreground'>
                {replayData?.message}
              </span>
            </div>
          </div>
          <span className='cursor-pointer' onClick={() => setReply(false)}>
            <Icon
              icon='heroicons:x-mark-20-solid'
              className='text-2xl text-default-900'
            />
          </span>
        </div>
      )}

      <div className='w-full flex items-end gap-1 lg:gap-4 lg:px-4 relative px-2'>
        <div className='flex-none flex gap-1 absolute md:static top-0 left-1.5 z-10'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type='button'
                      size='icon'
                      className='bg-transparent rounded-full hover:bg-default-50'
                    >
                      <span className='h-6 w-6 rounded-full bg-primary'>
                        <Icon
                          icon='mdi:plus'
                          className='text-2xl text-primary-foreground'
                        />
                      </span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side='top' align='start'>
                    <p>Open More Actions</p>
                    <TooltipArrow className='fill-primary' />
                  </TooltipContent>
                </Tooltip>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-[196px] p-2.5 rounded-xl'
              align='start'
              side='top'
            >
              <DropdownMenuItem className='py-2 px-2 rounded-xl'>
                <div className='flex items-center gap-1'>
                  <Icon
                    icon='material-symbols:mic'
                    className='text-xl text-primary'
                  />
                  <span className='text-sm font-medium text-default-900'>
                    Send a voice clip
                  </span>
                </div>
              </DropdownMenuItem>
              {message.length > 0 && (
                <>
                  <DropdownMenuItem className='py-2 px-2 rounded-xl'>
                    <Label htmlFor='attachement' className='flex items-center'>
                      <Icon
                        icon='tabler:file-filled'
                        className='text-xl text-primary'
                      />
                      <Input type='file' className='hidden' id='attachement' />
                      <span className='text-sm font-medium text-default-900 inline-block ml-1'>
                        Attach a file
                      </span>
                    </Label>
                  </DropdownMenuItem>
                  <DropdownMenuItem className='py-2 px-2 rounded-xl'>
                    <div className='flex items-center gap-1'>
                      <Icon
                        icon='fluent:sticker-12-filled'
                        className='text-xl text-primary'
                      />
                      <span className='text-sm font-medium text-default-900 inline-block ml-1'>
                        Choose a sticker
                      </span>
                    </div>
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className='flex-1'>
          <form onSubmit={handleSubmit}>
          {isTyping && (
                <span>issdgdsgdsgds</span>
              )}
            <div className='flex gap-1 relative'>
              <textarea
                value={message}
                onChange={handleChange}
                placeholder='Type your message...'
                className='bg-background border border-default-200 outline-none focus:border-primary rounded-xl break-words pl-8 md:pl-3 px-3 flex-1 h-10 pt-2 p-1 pr-8 no-scrollbar'
                onKeyDown={(e:any) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
                style={{
                  minHeight: '40px',
                  maxHeight: '120px',
                  overflowY: 'auto',
                  resize: 'none',
                }}
              />

              {isTyping && (
                <span>issdgdsgdsgds</span>
              )}
              

              <Popover>
                <PopoverTrigger asChild>
                  <span className='absolute ltr:right-12 rtl:left-12 bottom-1.5 h-7 w-7 rounded-full cursor-pointer'>
                    <Annoyed className='w-6 h-6 text-primary' />
                  </span>
                </PopoverTrigger>
                <PopoverContent
                  side='top'
                  className='w-fit p-0 shadow-none border-none bottom-0 rtl:left-5 ltr:-left-[110px]'
                >
                  <Picker
                    data={data}
                    onEmojiSelect={handleSelectEmoji}
                    theme='light'
                  />
                </PopoverContent>
              </Popover>
              <Button
                type='submit'
                className='rounded-full bg-default-200 hover:bg-default-300 h-[42px] w-[42px] p-0 self-end'
              >
                <SendHorizontal className='w-5 h-8 text-primary rtl:rotate-180' />
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
