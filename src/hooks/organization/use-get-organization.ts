import { ORGANIZATION_API } from '@/services';
import { useQuery } from '@tanstack/react-query';

export const useGetPendingInvitations = () => {
  const response = useQuery({
    queryKey: [ORGANIZATION_API.GET_PENDING_INVITATIONS.name],
    queryFn: () => ORGANIZATION_API.GET_PENDING_INVITATIONS(),
  });

  return {
    ...response,
    organizations: response.data,
  };
};

export const useGetOrganizations = ({ type = 'own' }: { type?: string }) => {
  const response = useQuery({
    queryKey: [ORGANIZATION_API.GET_ORGANIZATIONS.name, type],
    queryFn: () => ORGANIZATION_API.GET_ORGANIZATIONS({ type }),
  });

  return {
    ...response,
    organizations: response.data,
  };
};

export const useGetOranization = (organizationId: string) => {
  const response = useQuery({
    queryKey: [ORGANIZATION_API.GET_ORGANIZATION.name, organizationId],
    queryFn: () => ORGANIZATION_API.GET_ORGANIZATION(organizationId),
    enabled: !!organizationId,
  });

  return {
    ...response,
    organization: response.data,
  };
};

export const useGetInvitations = () => {
  const response = useQuery({
    queryKey: [ORGANIZATION_API.GET_PENDING_INVITATIONS.name],
    queryFn: () => ORGANIZATION_API.GET_PENDING_INVITATIONS(),
  });

  return {
    ...response,
    invitations: response.data,
  };
};
