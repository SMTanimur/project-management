import { Organization } from '../oragnization';
import { IUser } from '../user';
export * from './chat.enum'
import {
  ChatMemberRole,
  ChatType,
  ChatVisibility,
  MessageType,
} from './chat.enum';

export interface IChatSettings {
  canMembersInvite: boolean;
  canMembersMessage: boolean;
  approvalRequired: boolean;
  messageRetention: number;
}

export interface IPaginationQuery {
  page?: number;
  limit?: number;
  sort?: string;
}

export interface IChatQuery extends IPaginationQuery {
  type?: ChatType;
  search?: string;
  visibility?: ChatVisibility;
}

export interface IMessageQuery extends IPaginationQuery {
  startDate?: Date;
  endDate?: Date;
  messageType?: MessageType;
  search?: string;
}


// Interface for a Group result
export interface GroupResult {
  id: string;
  name: string;
  members: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
  }[];
  type: 'Group'; // Added type field
}

// Interface for a Member result
export interface MemberResult {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  type: 'User';
}

// Interface for Chat Member
export interface IChatMember {
  user: IUser;
  role: ChatMemberRole;
  chat: IChat;
  joinedAt: Date;
}

// Interface for Chat
export interface IChat {
  _id: string;
  name?: string;
  description?: string;
  type: ChatType;
  visibility: ChatVisibility;
  creator: IUser;
  members: IChatMember[];
  organization: Organization;
  project?: any;
  settings: IChatSettings;
  avatar?: string;
  isArchived: boolean;
  lastMessage?: IMessage;
}

export interface IUsersChat {
  data: IChat[]
  total: number
  page: number
  totalPages: number
}
// Interface for Attachment
export interface IAttachment {
  url: string;
  name: string;
  type: string;
  size: number;
}

// Interface for Reaction
export interface IReaction {
  user: IUser;
  emoji: string;
  createdAt: Date;
}

// Interface for Message
export interface IMessage {
  _id: string
  chat: IChat;
  sender: IUser;
  content: string;
  messageType: MessageType;
  attachments?: IAttachment[];
  mentions?: IUser[];
  reactions?: IReaction[];
  replyTo?: string;
  readBy: Map<string, boolean>;
  isEdited: boolean;
  editedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}



