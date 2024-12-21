"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn, formatTime } from "@/lib/utils";
import { IChat, IUser } from "@/types";

export const ContactList = ({
  contact,
  openChat,
  user,
  selectedChatId,
}: {
  contact: IChat;
  user:IUser
  openChat: (id: any) => void;
  selectedChatId: string;
}) => {
  const { avatar, _id, name, members,  description,  type, organization } = contact;

  const chatType = type === "group" ? "Group" : "Direct";
  
  let displayName = name; 
  let displayAvatar = avatar;
  let status = "offline"; 
  // For direct chat, show member's name and avatar
  if (type === "direct") {
    const otherMember = members.find((member) => member.user._id !== user?._id);
    if (otherMember) {
      status = otherMember.user.connection_status;
      
      displayName = `${otherMember.user.firstName} ${otherMember.user.lastName}`;
      displayAvatar = otherMember.user.avatar || ""; // Use member's avatar or fallback to empty if not available
    }
  }

  return (
    <div
      className={cn(
        "gap-4 py-2 lg:py-2.5 px-3 border-l-2 border-transparent hover:bg-default-200 cursor-pointer flex",
        {
          "lg:border-primary/70 lg:bg-default-200": _id === selectedChatId,
        }
      )}
      onClick={() => openChat(_id)}
    >
      <div className="flex-1 flex gap-3">
        <div className="relative inline-block">
          <Avatar>
            <AvatarImage src={displayAvatar || ""} />
            <AvatarFallback className="uppercase">
              {(displayName || "").slice(0, 2)} {/* Fallback to first two letters of displayName */}
            </AvatarFallback>
          </Avatar>
          {
            type === "direct" && (
              <Badge
            className="h-2 w-2 p-0 ring-1 ring-border ring-offset-[1px] items-center justify-center absolute left-[calc(100%-8px)] top-[calc(100%-10px)]"
            color={status === "online" ? "success" : "secondary"}
          />
            )
          }
          
        </div>
        <div className="block">
          <div className="truncate max-w-[120px]">
            <span className="text-sm text-default-900 font-medium">{displayName}</span>
          </div>
          <div className="truncate max-w-[120px]">
            <span className="text-xs text-default-600">{description}</span>
          </div>
          {/* Display chat type (Group or Direct) */}
          <div className="text-xs text-default-500 mt-1">{chatType}</div>
        </div>
      </div>

      <div className="flex-none flex-col items-end gap-2 hidden lg:flex">
        {/* <span className="text-xs text-default-600 text-end uppercase">
          {formatTime(date)} 
        </span> */}
        {/* <span
          className={cn(
            "h-[14px] w-[14px] flex items-center justify-center bg-default-400 rounded-full text-primary-foreground text-[10px] font-medium",
            {
              "bg-primary/70": unreadmessage > 0,
            }
          )}
        >
          {unreadmessage === 0 ? (
            <Icon icon="uil:check" className="text-sm" />
          ) : (
            unreadmessage
          )}
        </span> */}
      </div>
    </div>
  );
};

