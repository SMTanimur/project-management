import { IUser } from "../user"

export interface Invitation {
  email: string
  invitedBy: IUser
  status: string
  invitedAt: Date
}

export interface Member {
  user: IUser
  role: string
}

export interface Organization {
  _id: string 
  name: string
  owner?: IUser
  members?: Member[]
  brandColor?: string
  isOwner: boolean
  logoText?: string
  logo?: string
  type:string
  isDefault?: boolean
  description?: string
  projects?: (string )[]
}

export interface IInvitation {
  email: string;
  invitedBy: IUser;
  status: string;
  invitedAt: Date;
  _id: string;
  organization: Organization;
}

export interface CreateOrganizationInput {
  name: string
  owner?: string
  isDefault?: boolean
}

export interface UpdateOrganizationInput {
  organizationId: string
  name?: string
  owner?: string
  isDefault?: boolean
}

export type InvitationResponse = 'accepted' | 'rejected'