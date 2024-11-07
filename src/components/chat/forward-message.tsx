"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

 export const ForwardMessage = ({ open, contacts, setIsOpen }: {
  open: boolean;
  contacts: any;
  setIsOpen: any
}) => {
  return (
    <Dialog open={open} >
      <DialogContent size="xl" className="px-0 pb-0">
        <DialogHeader className="relative py-2">
          <DialogTitle className="text-center">Forward</DialogTitle>
        </DialogHeader>
        <div className="px-2">
          <div className="px-4">
            <div className="relative my-5 ">
              <Input
                type="text"
                placeholder="Search for people"
                variant="flat"
                className="bg-default-100 pl-8"
                radius="xl"
              />
              <span className="absolute top-1/2 -translate-y-1/2 left-2.5">
                <Icon icon="majesticons:search-line" className="text-lg" />
              </span>
            </div>
          </div>
          <div className="xl:h-[calc(100vh-340px)]">
            <ScrollArea className="h-full">

              {contacts?.contacts?.map((contact: any, index: number) => (
                <div
                  className={cn(
                    " gap-4 py-2.5 px-2.5 border-l-2 border-transparent rounded-sm  hover:bg-default-100 cursor-pointer flex"
                  )}
                  key={`contact-${index}`} >
                  <div className="flex-1 flex items-center gap-3">
                    <div className="relative inline-block ">
                      <Avatar>
                        <AvatarImage src={contact.avatar?.src} />
                        <AvatarFallback>{contact.fullName}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div>
                      <span className="text-sm text-default-900 font-medium">
                        {contact.fullName}
                      </span>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-md"
                  >
                    Send
                  </Button>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </DialogContent >
    </Dialog >
  );
};

export default ForwardMessage;
