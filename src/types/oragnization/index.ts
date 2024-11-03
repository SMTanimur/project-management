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
  _id?: string 
  name: string
  owner?: IUser
  members?: Member[]
  brandColor?: string
  logoText?: string
  logo?: string
  isDefault?: boolean
  description?: string
  invitations?: Invitation[]
  projects?: (string )[]
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