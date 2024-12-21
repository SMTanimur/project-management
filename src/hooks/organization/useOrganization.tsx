'use client';

import { COLORS_ARRAY } from '@/constants';
import { ORGANIZATION_API } from '@/services';
import { useGlobalLocalStateStore } from '@/store';
import {
  createOrganizationSchema,
  TCreateOrganization,
  TInvitationDto,
  TInvitationResponse,
  TUpdateOrganization,
} from '@/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export const useOrganization = () => {
  const organizationForm = useForm<TCreateOrganization>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: {
      brandColor: COLORS_ARRAY[0],
      logo: '',
      logoText: 'Sample',
    },
  });
  const { setGlobalStore } = useGlobalLocalStateStore();
  const { mutateAsync: createOrganization, isPending: isCreating } =
    useMutation({
      mutationFn: ORGANIZATION_API.CREATE,
      mutationKey: [ORGANIZATION_API.CREATE.name],
    });

  const queryClient = useQueryClient();

  const handleCreateOrganization = async (input: TCreateOrganization) => {
    try {
      await createOrganization(input, {
        onSuccess: data => {
          toast.success(data.message);
          organizationForm.reset();
          queryClient.invalidateQueries({
            queryKey: [ORGANIZATION_API.GET_ORGANIZATIONS.name],
          });
          setGlobalStore({ currentOrganizationId: data.organization._id });
        },
      });
    } catch (error) {
      toast.error('Failed to create organization');
    }
  };

  const { mutateAsync: updateOrganization, isPending: isUpdating } =
    useMutation({
      mutationFn: (params: { id: string; input: TUpdateOrganization }) =>
        ORGANIZATION_API.UPDATE(params.id, params.input),
      mutationKey: [ORGANIZATION_API.UPDATE.name],
    });

  const handleUpdateOrganization = async (params: {
    id: string;
    input: TUpdateOrganization;
  }) => {
    try {
      await updateOrganization(
        { id: params.id, input: params.input },
        {
          onSuccess: data => {
            toast.success(data.message);
            queryClient.invalidateQueries({
              queryKey: [ORGANIZATION_API.GET_ORGANIZATIONS.name],
            });
          },
        }
      );
    } catch (error) {
      toast.error('Failed to update organization');
    }
  };

  const { mutateAsync: deleteOrganization, isPending: isDeleting } =
    useMutation({
      mutationFn: ORGANIZATION_API.DELETE,
      mutationKey: [ORGANIZATION_API.DELETE.name],
    });

  const handleDeleteOrganization = async (id: string) => {
    try {
      await deleteOrganization(id, {
        onSuccess: data => {
          toast.success(data.message);
          queryClient.invalidateQueries({
            queryKey: [ORGANIZATION_API.GET_ORGANIZATIONS.name],
          });
        },
      });
    } catch (error) {
      toast.error('Failed to delete organization');
    }
  };



  
  const { mutateAsync: inviteUser, isPending: isInviting } = useMutation({
    mutationFn: (input: TInvitationDto) => ORGANIZATION_API.INVITE_USER(input),
    mutationKey: [ORGANIZATION_API.INVITE_USER.name],
  });

  const handleInviteUser = async (input: TInvitationDto) => {
    try {
      await inviteUser(input, {
        onSuccess: data => {
          toast.success(data.message);
        },
      });
    } catch (error) {
      toast.error('Failed to invite user');
    }
  };

  const {
    mutateAsync: respondToInvitation,
    isPending: isRespondingToInvitation,
  } = useMutation({
    mutationFn: (params: { id: string; input: TInvitationResponse }) =>
      ORGANIZATION_API.RESPOND_TO_INVITATION(params.id, params.input),
    mutationKey: [ORGANIZATION_API.RESPOND_TO_INVITATION.name],
  });

  const handleRespondToInvitation = async (params: {
    id: string;
    input: TInvitationResponse;
  }) => {
    try {
      await respondToInvitation(params, {
        onSuccess: data => {
          toast.success(data.message);
          queryClient.invalidateQueries({
            queryKey: [ORGANIZATION_API.GET_PENDING_INVITATIONS.name],
          });

          queryClient.invalidateQueries({
            queryKey: [ORGANIZATION_API.GET_ORGANIZATIONS.name],
          }); 
        },
      });
    } catch (error) {
      toast.error('Failed to respond to invitation');
    }
  };

  return {
    organizationForm,
    handleCreateOrganization,
    isCreating,
    handleUpdateOrganization,
    isUpdating,
    handleDeleteOrganization,
    isDeleting,
    handleInviteUser,
    isInviting,
    handleRespondToInvitation,
    isRespondingToInvitation,
  };
};
