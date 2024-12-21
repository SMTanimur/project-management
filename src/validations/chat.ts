import { ChatMemberRole, ChatType, ChatVisibility, MessageType } from '@/types';
import { send } from 'process';
import { z } from 'zod';

// Custom ObjectId validation with error messages
const objectId = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, { message: 'Invalid ObjectId format' });

// Attachment Zod schema
const AttachmentSchema = z.object({
  url: z.string().url({ message: 'Invalid URL format' }),
  name: z.string({ required_error: 'File name is required' }),
  type: z.string({ required_error: 'MIME type is required' }),
  size: z
    .number({ required_error: 'File size is required' })
    .positive({ message: 'File size must be a positive number' }),
});

// Reaction Zod schema
const ReactionSchema = z.object({
  user: objectId,
  emoji: z.string({ required_error: 'Emoji reaction is required' }),
  createdAt: z.date().optional(),
});

// ChatSettings Zod schema
const ChatSettingsSchema = z.object({
  canMembersInvite: z.boolean().default(true),
  canMembersMessage: z.boolean().default(true),
  approvalRequired: z.boolean().default(false),
});

// ChatMember Zod schema
const ChatMemberSchema = z.object({
  user: objectId,
  role: z.nativeEnum(ChatMemberRole).default(ChatMemberRole.MEMBER),
  chat: objectId,
  joinedAt: z.date().optional(),
});

// Message Zod schema
const MessageSchema = z.object({
  chat: objectId,
  sender: objectId,
  content: z
    .string({ required_error: 'Message content is required' })
    .optional(),

  messageType: z.nativeEnum(MessageType).default(MessageType.TEXT).optional(),
  attachments: z.array(AttachmentSchema).optional(),
  mentions: z.array(objectId).optional(),
  sendTo: objectId.optional(),
  reactions: z.array(ReactionSchema).optional(),
  replyTo: objectId.optional(),
  readBy: z.record(z.boolean()).default({}),
  isEdited: z.boolean().default(false),
  editedAt: z.date().optional(),
});

// Chat Zod schema
const ChatSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Chat name must be at least 2 characters' })
    .max(100, { message: 'Chat name cannot exceed 100 characters' })
    .optional(),
  description: z
    .string()
    .max(500, { message: 'Description cannot exceed 500 characters' })
    .optional(),
  type: z.nativeEnum(ChatType),
  visibility: z.nativeEnum(ChatVisibility).default(ChatVisibility.PUBLIC),
  sendTo: objectId.optional(),
  creator: objectId,
  members: z.array(ChatMemberSchema),
  organization: objectId,
  project: objectId.optional(),
  settings: ChatSettingsSchema.default({
    canMembersInvite: true,
    canMembersMessage: true,
    approvalRequired: false,
  }),
  avatar: z.string().url({ message: 'Invalid avatar URL format' }).optional(),
  isArchived: z.boolean().default(false),
  lastMessage: objectId.optional(),
});

export const CreateChatSchema = ChatSchema.pick({
  name: true,
  description: true,
  type: true,
  members: true,
  organization: true,
  avatar: true,
});

export type TCreateChat = z.infer<typeof CreateChatSchema>;

export const UpdateChatSchema = ChatSchema.pick({
  name: true,
  description: true,
  avatar: true,
  isArchived: true,
});

export type TUpdateChat = z.infer<typeof UpdateChatSchema>;

export const CreateMessageSchema = MessageSchema.pick({
  content: true,
  messageType: true,
  mentions: true,
  sendTo: true,
  replyTo: true,
  
});

export type TCreateMessage = z.infer<typeof CreateMessageSchema>;

// Exporting all schemas for validation
export const schemas = {
  ChatSchema,
  ChatMemberSchema,
  ChatSettingsSchema,
  MessageSchema,
  AttachmentSchema,
  ReactionSchema,
};
