'use client';
import {
  Card,
  CardContent,
  CardHeader,
  ContactList,
  ScrollArea,
} from '@/components';
import { useGetChats, useMediaQuery, useUser } from '@/hooks';
import { cn } from '@/lib';
import { IChat, IUser } from '@/types';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { MyProfileHeader } from '../components';

export const MessagesScreen = () => {
  const { data: user } = useUser();
  const router = useRouter();
  const [selectedChatId, setSelectedChatId] = useState<any | null>(null);
  const [showContactSidebar, setShowContactSidebar] = useState<boolean>(false);
  const [showInfo, setShowInfo] = useState<boolean>(false);

  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [!user]);
  // reply state
  const [replay, setReply] = useState<boolean>(false);
  const [replayData, setReplyData] = useState<any>({});

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

  const { chats, isLoading } = useGetChats();

  const isLg = useMediaQuery('(max-width: 1024px)');
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
      {/* {selectedChatId ? (
        <div className="flex-1 ">
          <div className=" flex space-x-5 h-full rtl:space-x-reverse">
            <div className="flex-1">
              <Card className="h-full flex flex-col ">
                <CardHeader className="flex-none mb-0">
                  <MessageHeader
                    showInfo={showInfo}
                    handleShowInfo={handleShowInfo}
                    profile={profileData}
                    mblChatHandler={() =>
                      setShowContactSidebar(!showContactSidebar)
                    }
                  />
                </CardHeader>
                {isOpenSearch && (
                  <SearchMessages
                    handleSetIsOpenSearch={handleSetIsOpenSearch}
                  />
                )}

                <CardContent className=" !p-0 relative flex-1 overflow-y-auto">
                  <div
                    className="h-full py-4 overflow-y-auto no-scrollbar"
                    ref={chatHeightRef}
                  >
                    {messageLoading ? (
                      <Loader />
                    ) : (
                      <>
                        {messageIsError ? (
                          <EmptyMessage />
                        ) : (
                          chats?.chat?.chat?.map((message: any, i: number) => (
                            <Messages
                              key={`message-list-${i}`}
                              message={message}
                              contact={chats?.contact}
                              profile={profileData}
                              onDelete={onDelete}
                              index={i}
                              selectedChatId={selectedChatId}
                              handleReply={handleReply}
                              replayData={replayData}
                              handleForward={handleForward}
                              handlePinMessage={handlePinMessage}
                              pinnedMessages={pinnedMessages}
                            />
                          ))
                        )}
                      </>
                    )}
                    <PinnedMessages
                      pinnedMessages={pinnedMessages}
                      handleUnpinMessage={handleUnpinMessage}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex-none flex-col px-0 py-4 border-t border-border">
                  <MessageFooter
                    handleSendMessage={handleSendMessage}
                    replay={replay}
                    setReply={setReply}
                    replayData={replayData}
                  />
                </CardFooter>
              </Card>
            </div>

            {showInfo && (
              <ContactInfo
                handleSetIsOpenSearch={handleSetIsOpenSearch}
                handleShowInfo={handleShowInfo}
                contact={contacts?.contacts?.find(
                  (contact: ContactType) => contact.id === selectedChatId
                )}
              />
            )}
          </div>
        </div>
      ) : (
        <Blank mblChatHandler={() => setShowContactSidebar(true)} />
      )}
      <ForwardMessage
        open={isForward}

        setIsOpen={setIsForward}
        contacts={contacts}
      /> */}
    </div>
  );
};
