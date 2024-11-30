'use client';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  ContactList,
  EmptyMessage,
  MessageFooter,
  MessageHeader,
  Messages,
  ScrollArea,
} from '@/components';
import {
  useGetChat,
  useGetChatMessages,
  useGetChats,
  useMediaQuery,
  useUser,
} from '@/hooks';
import { cn } from '@/lib';
import { IChat, IMessage, IUser } from '@/types';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { MyProfileHeader } from '../components';
import Blank from './blank';
import { useSocket } from '@/app/provider/socketContext';
import { useChat } from '@/hooks';

export const MessagesScreen = () => {
  const { data: user } = useUser();
  const router = useRouter();
  const [selectedChatId, setSelectedChatId] = useState<any | null>(null);
  const [showContactSidebar, setShowContactSidebar] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  // reply state
  const [replay, setReply] = useState<boolean>(false);
  const [replayData, setReplyData] = useState<any>({});
   const {messages,isLoading:isMessageLoading}=useGetChatMessages(selectedChatId as string)
  // const { messages, isLoading: isMessageLoading } = useChat(selectedChatId);

  // search state
  const [isOpenSearch, setIsOpenSearch] = useState<boolean>(false);

  const [pinnedMessages, setPinnedMessages] = useState<any[]>([]);
  // Forward State
  const [isForward, setIsForward] = useState<boolean>(false);
  const openChat = (chatId: any) => {
    setSelectedChatId(chatId);
    setReply(false);
    if (showContactSidebar) {
      setShowContactSidebar(false);
    }
  };

  const onDelete = (selectedChatId: any, index: number) => {
    const obj = { selectedChatId, index };

    // Remove the deleted message from pinnedMessages if it exists
    const updatedPinnedMessages = pinnedMessages.filter(
      msg => msg.selectedChatId !== selectedChatId && msg.index !== index
    );

    setPinnedMessages(updatedPinnedMessages);
  };

  const handleShowInfo = () => {
    setShowInfo(!showInfo);
  };
  const handleSendMessage = (message: any) => {
    if (!selectedChatId || !message) return;

    console.log(message, 'ami msg');
  };
  const chatHeightRef = useRef<HTMLDivElement | null>(null);

  // replay message
  const handleReply = (data: any, contact: any) => {
    const newObj = {
      message: data,
      contact,
    };
    setReply(true);
    setReplyData(newObj);
  };

  useEffect(() => {
    if (chatHeightRef.current) {
      chatHeightRef.current.scrollTo({
        top: chatHeightRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [handleSendMessage]);
  useEffect(() => {
    if (chatHeightRef.current) {
      chatHeightRef.current.scrollTo({
        top: chatHeightRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [pinnedMessages]);

  // handle search bar

  const handleSetIsOpenSearch = () => {
    setIsOpenSearch(!isOpenSearch);
  };
  // handle pin note

  const handlePinMessage = (note: any) => {
    const updatedPinnedMessages = [...pinnedMessages];

    const existingIndex = updatedPinnedMessages.findIndex(
      msg => msg.note === note.note
    );

    if (existingIndex !== -1) {
      updatedPinnedMessages.splice(existingIndex, 1); // Remove the message
      //setIsPinned(false);
    } else {
      updatedPinnedMessages.push(note); // Add the message
      // setIsPinned(true);
    }

    setPinnedMessages(updatedPinnedMessages);
  };

  const handleUnpinMessage = (pinnedMessage: any) => {
    // Create a copy of the current pinned messages array
    const updatedPinnedMessages = [...pinnedMessages];

    // Find the index of the message to unpin in the updatedPinnedMessages array
    const index = updatedPinnedMessages.findIndex(
      msg =>
        msg.note === pinnedMessage.note && msg.avatar === pinnedMessage.avatar
    );

    if (index !== -1) {
      // If the message is found in the array, remove it (unpin)
      updatedPinnedMessages.splice(index, 1);
      // Update the state with the updated pinned messages array
      setPinnedMessages(updatedPinnedMessages);
    }
  };

  // Forward handle
  const handleForward = () => {
    setIsForward(!isForward);
  };

  const { chats, isLoading } = useGetChats();
  const { chat, isLoading: isChatLoading } = useGetChat(
    selectedChatId as string
  );


  let member = null;

  if (chat?.type === 'direct') {
    member = chat.members.find(member => member.user._id !== user?._id);
  }

  const isLg = useMediaQuery('(max-width: 1024px)');
  console.log({ member });
  return (
    <div className='flex gap-5 pt-6 px-6 h-[calc(100vh-100px)]  relative space-x-reverse'>
      {isLg && showContactSidebar && (
        <div
          className=' bg-background/60 backdrop-filter
         backdrop-blur-sm absolute w-full flex-1 inset-0 z-[99] rounded-md'
          onClick={() => setShowContactSidebar(false)}
        ></div>
      )}
      {isLg && showInfo && (
        <div
          className=' bg-background/60 backdrop-filter
         backdrop-blur-sm absolute w-full flex-1 inset-0 z-40 rounded-md'
          onClick={() => setShowInfo(false)}
        ></div>
      )}
      <div
        className={cn('transition-all duration-150 flex-none  ', {
          'absolute h-full top-0 md:w-[260px] w-[200px] z-[999]': isLg,
          'flex-none min-w-[260px]': !isLg,
          'left-0': isLg && showContactSidebar,
          '-left-full': isLg && !showContactSidebar,
        })}
      >
        <Card className='h-full pb-0'>
          <CardHeader className='border-none pb-0 mb-0'>
            <MyProfileHeader profile={user as IUser} />
          </CardHeader>
          <CardContent className='pt-0 px-0   lg:h-[calc(100%-100px)] h-[calc(100%-70px)]   '>
            <ScrollArea className='h-full'>
              {isLoading ? (
                <Loader />
              ) : (
                chats?.data?.map((contact: IChat) => (
                  <ContactList
                    key={contact._id}
                    contact={contact}
                    user={user as IUser}
                    selectedChatId={selectedChatId}
                    openChat={openChat}
                  />
                ))
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      {/* chat sidebar  end*/}
      {/* chat messages start */}
      {selectedChatId ? (
        <div className='flex-1 '>
          <div className=' flex space-x-5 h-full rtl:space-x-reverse'>
            <div className='flex-1'>
              <Card className='h-full flex flex-col '>
                <CardHeader className='flex-none mb-0'>
                  <MessageHeader
                    showInfo={showInfo}
                    handleShowInfo={handleShowInfo}
                    profile={member ? (member.user as IUser) : ({} as IUser)}
                    mblChatHandler={() =>
                      setShowContactSidebar(!showContactSidebar)
                    }
                  />
                </CardHeader>
                {/* {isOpenSearch && (
                  <SearchMessages
                    handleSetIsOpenSearch={handleSetIsOpenSearch}
                  />
                )} */}

                <CardContent className=' !p-0 relative flex-1 overflow-y-auto'>
                  <div
                    className='h-full py-4 overflow-y-auto no-scrollbar'
                    ref={chatHeightRef}
                  >
                    {isMessageLoading ? (
                      <Loader />
                    ) : (
                      <>
                        {/* {isMessageError ? (
                          <EmptyMessage />
                        ) : ( */}
                        {messages &&
                          messages.length > 0 &&
                          messages
                            .map((message: IMessage, i: number) => (
                              <Messages
                                key={`message-list-${i}`}
                                message={message}
                                profile={user as IUser}
                                onDelete={onDelete}
                                index={i}
                                selectedChatId={selectedChatId}
                                handleReply={handleReply}
                                replayData={replayData}
                                handleForward={handleForward}
                                handlePinMessage={handlePinMessage}
                                pinnedMessages={pinnedMessages}
                              />
                            ))}
                      </>
                    )}
                    {/* <PinnedMessages
                      pinnedMessages={pinnedMessages}
                      handleUnpinMessage={handleUnpinMessage}
                    /> */}
                  </div>
                </CardContent>
                <CardFooter className='flex-none flex-col px-0 py-4 border-t border-border'>
                  <MessageFooter
                    replay={replay}
                    chat={chat as IChat}
                    sendTo={member ? (member.user as IUser) : ({} as IUser)}
                    currentUser={user as IUser}
                    setReply={setReply}
                    replayData={replayData}
                  />
                </CardFooter>
              </Card>
            </div>

            {/* {showInfo && (
              <ContactInfo
                handleSetIsOpenSearch={handleSetIsOpenSearch}
                handleShowInfo={handleShowInfo}
                contact={contacts?.contacts?.find(
                  (contact: ContactType) => contact.id === selectedChatId
                )}
              />
            )} */}
          </div>
        </div>
      ) : (
        <Blank mblChatHandler={() => setShowContactSidebar(true)} />
      )}
    </div>
  );
};
