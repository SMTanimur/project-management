import { api } from '@/api';
import { API_PATHS } from '@/lib';
import { IInvitation, Invitation, Organization } from '@/types';
import {
  TCreateOrganization,
  TInvitationDto,
  TInvitationResponse,
  TUpdateOrganization,
} from '@/validations';

export const ORGANIZATION_API = {
  CREATE: async (
    input: TCreateOrganization
  ): Promise<{ message: string; organization: Organization }> => {
    return await api.post(API_PATHS.ORGANIZATION, input);
  },
  UPDATE: async (
    id: string,
    input: TUpdateOrganization
  ): Promise<{ message: string }> => {
    return await api.put(`${API_PATHS.ORGANIZATION}/${id}`, input);
  },

  DELETE: async (id: string): Promise<{ message: string }> => {
    return await api.delete(`${API_PATHS.ORGANIZATION}/${id}`);
  },

  GET_ORGANIZATION: async (organizationId: string): Promise<Organization> => {
    return await api.get(`${API_PATHS.ORGANIZATION}/${organizationId}`);
  },

  GET_ORGANIZATIONS: async (query: {
    type: string;
  }): Promise<Organization[]> => {
    return await api.get(API_PATHS.ORGANIZATION, { params: query });
  },
  INVITE_USER: async (input: TInvitationDto): Promise<{ message: string }> => {
    return await api.post(`${API_PATHS.ORGANIZATION}/invitations`, input);
  },

  RESPOND_TO_INVITATION: async (
    id: string,
    input: TInvitationResponse
  ): Promise<{ message: string }> => {
    return await api.put(
      `${API_PATHS.ORGANIZATION}/${id}/invitations/respond`,
      { response: input.response }
    );
  },

  GET_PENDING_INVITATIONS: async (): Promise<IInvitation[]> => {
    return await api.get(`${API_PATHS.ORGANIZATION}/invitations/pending`);
  },

  GET_INVITATIONS: async (): Promise<IInvitation[]> => {
    return await api.get(`${API_PATHS.ORGANIZATION}/invitations`);
  },
};
