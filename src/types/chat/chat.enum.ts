export enum ChatType {
  DIRECT = 'direct',
  GROUP = 'group'
}

export enum ChatVisibility {
  PUBLIC = 'public',
  PRIVATE = 'private'
}

export enum MessageType {
  TEXT = 'text',
  FILE = 'file',
  IMAGE = 'image',
  VIDEO = 'video',
  AUDIO = 'audio',
  SYSTEM = 'system'
}

export enum ChatMemberRole {
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  MEMBER = 'member'
}

export enum ChatMemberStatus {
  ACTIVE = 'active',
  MUTED = 'muted',
  BANNED = 'banned'
}

export enum ChatEvent {
  JOIN = 'join',
  LEAVE = 'leave',
  NEW_MESSAGE = 'newmessage',
  TYPING = 'typing',
  READ = 'read'
}