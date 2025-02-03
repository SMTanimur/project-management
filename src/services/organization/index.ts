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
    const response = await api.post(API_PATHS.ORGANIZATION, input);
    return response.data;
  },
  UPDATE: async (
    id: string,
    input: TUpdateOrganization
  ): Promise<{ message: string }> => {
    const response = await api.put(`${API_PATHS.ORGANIZATION}/${id}`, input);
    return response.data;
  },

  DELETE: async (id: string): Promise<{ message: string }> => {
    const response = await api.delete(`${API_PATHS.ORGANIZATION}/${id}`);
    return response.data;
  },

  GET_ORGANIZATION: async (organizationId: string): Promise<Organization> => {
    const response = await api.get(
      `${API_PATHS.ORGANIZATION}/${organizationId}`
    );
    return response.data;
  },

  GET_ORGANIZATIONS: async (query: {
    type: string;
  }): Promise<Organization[]> => {
    const response = await api.get(API_PATHS.ORGANIZATION, { params: query });
    return response.data;
  },
  INVITE_USER: async (input: TInvitationDto): Promise<{ message: string }> => {
    const response = await api.post(
      `${API_PATHS.ORGANIZATION}/invitations`,
      input
    );
    return response.data;
  },

  RESPOND_TO_INVITATION: async (
    id: string,
    input: TInvitationResponse
  ): Promise<{ message: string }> => {
    const response = await api.put(
      `${API_PATHS.ORGANIZATION}/${id}/invitations/respond`,
      { response: input.response }
    );
    return response.data;
  },

  GET_PENDING_INVITATIONS: async (): Promise<IInvitation[]> => {
    const response = await api.get(
      `${API_PATHS.ORGANIZATION}/invitations/pending`
    );
    return response.data;
  },

  GET_INVITATIONS: async (): Promise<IInvitation[]> => {
    const response = await api.get(`${API_PATHS.ORGANIZATION}/invitations`);
    return response.data;
  },
};
