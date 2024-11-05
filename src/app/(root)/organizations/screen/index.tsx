'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  useGetOrganizations,
  useGetPendingInvitations,
  useOrganization,
} from '@/hooks';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Card,
  CardContent,
  CardHeader,
  CreateOrganizationForm,
  DeleteConfirmationDialog,
  Dialog,
  DialogContent,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components';
import { Loader2, MoreHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const OrganizationsScreen = () => {
  const {
    organizations: ownOrganizations,
    isPending: isPendingOwnOrganizations,
  } = useGetOrganizations({ type: 'own' });
  const {
    organizations: joinedOrganizations,
    isPending: isPendingJoinedOrganizations,
  } = useGetOrganizations({ type: 'joined' });

  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  const {
    isDeleting,
    handleDeleteOrganization,
    isRespondingToInvitation,
    handleRespondToInvitation,
  } = useOrganization();
  const { data: invitations, isPending } = useGetPendingInvitations();
  return (
    <section className='p-8'>
      <div className='flex justify-between  items-center'>
        <h3 className='text-2xl font-bold'>My Organizations</h3>

        <Dialog>
          <DialogTrigger asChild>
            <Button>Create Organization</Button>
          </DialogTrigger>
          <DialogContent className='!max-w-3xl w-full'>
            <CreateOrganizationForm />
          </DialogContent>
        </Dialog>
      </div>
      <div className='mt-8'>
        <Tabs defaultValue='Created' className=' inline-block w-full '>
          <TabsList className=' bg-transparent p-0 border-b-2 w-full !justify-start  rounded-none'>
            <TabsTrigger
              className='capitalize  data-[state=active]:shadow-none  data-[state=active]:bg-transparent data-[state=active]:text-primary transition duration-150 before:transition-all before:duration-150 relative before:absolute
         before:left-1/2 before:-bottom-[5px] before:h-[2px]
           before:-translate-x-1/2 before:w-0 data-[state=active]:before:bg-primary data-[state=active]:before:w-full'
              value='Created'
            >
              Created ({ownOrganizations?.length ?? 0})
            </TabsTrigger>
            <TabsTrigger
              className='capitalize  data-[state=active]:shadow-none  data-[state=active]:bg-transparent data-[state=active]:text-primary transition duration-150 before:transition-all before:duration-150 relative before:absolute
         before:left-1/2 before:-bottom-[5px] before:h-[2px]
           before:-translate-x-1/2 before:w-0 data-[state=active]:before:bg-primary data-[state=active]:before:w-full'
              value='Joined'
            >
              Joined ({joinedOrganizations?.length ?? 0})
            </TabsTrigger>
            <TabsTrigger
              className='capitalize  data-[state=active]:shadow-none  data-[state=active]:bg-transparent data-[state=active]:text-primary transition duration-150 before:transition-all before:duration-150 relative before:absolute
         before:left-1/2 before:-bottom-[5px] before:h-[2px]
           before:-translate-x-1/2 before:w-0 data-[state=active]:before:bg-primary data-[state=active]:before:w-full'
              value='Invitations'
            >
              Invitations ({invitations?.length ?? 0})
            </TabsTrigger>
          </TabsList>

          <TabsContent value='Created' className='lg:grid lg:grid-cols-3 gap-4'>
            {ownOrganizations?.map(organization => (
              <Card key={organization?._id} className='w-full'>
                <DeleteConfirmationDialog
                  open={open}
                  title='Delete Organization'
                  description='Are you sure you want to delete this organization? This action cannot be undone.'
                  onClose={() => setOpen(false)}
                  onConfirm={() =>
                    handleDeleteOrganization(organization?._id as string)
                  }
                />
                <CardHeader className=' py-2 flex flex-row justify-between w-full  items-center gap-3 border-none mb-0'>
                  <div className=''>
                    <Badge
                      color={
                        organization?.type === 'personal'
                          ? 'secondary'
                          : organization?.type === 'business'
                          ? 'default'
                          : 'info'
                      }
                      variant='soft'
                      className=' capitalize'
                    >
                      {organization?.type}
                    </Badge>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size='icon'
                        className='flex-none h-6 w-6 bg-default-200 rounded-full hover:bg-default-300'
                      >
                        <MoreHorizontal className='h-4 w-4 text-default-700' />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-[196px]' align='end'>
                      <DropdownMenuItem
                        className='cursor-pointer'
                        onClick={() =>
                          router.push(`/organizations/${organization?._id}`)
                        }
                      >
                        View
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className='cursor-pointer'
                        onClick={() => setOpen(true)}
                      >
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuItem className='cursor-pointer'>
                        Edit
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardHeader>
                <CardContent className='p-4 pt-0 pb-5'>
                  {/* logo, title,desc */}

                  <div className='flex gap-2'>
                    <div>
                      {organization?.logo ? (
                        <Avatar className='rounded h-12 w-12'>
                          <AvatarImage
                            src={organization.logo as string}
                            alt=''
                          />
                          <AvatarFallback className='rounded uppercase bg-success/30 text-success'>
                            {organization?.name}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar className='rounded h-12 w-12'>
                          <AvatarFallback
                            className='rounded uppercase text-success'
                            style={{ backgroundColor: organization.brandColor }}
                          >
                            {organization?.logoText}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    <div>
                      <div className='text-base font-semibold text-default-900 capitalize mb-1'>
                        {organization?.name}
                      </div>
                      {organization?.description && (
                        <div className='text-xs font-medium text-default-600 max-h-[34px]  overflow-hidden'>
                          {organization?.description}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value='Joined'>
            <div className='flex flex-col gap-4'>
              <div className='flex items-center justify-between'>
                <h3 className='text-lg font-bold'>Organization Name</h3>
                <Button>View</Button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value='Invitations'>
            <div className='flex flex-col gap-4'>
              {invitations?.map(invitation => (
                <Card key={invitation._id} className='w-full'>
                  <CardContent className='p-4'>
                    <div className='flex justify-between items-center'>
                      <div className='flex gap-4 items-center'>
                        <Avatar className='rounded h-12 w-12'>
                          <AvatarFallback className='rounded uppercase bg-primary/10 text-primary'>
                            {invitation.organization?.logoText}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className='font-semibold text-default-900'>
                            {invitation.organization?.name}
                          </h4>
                          <p className='text-sm text-default-600'>
                            Invited by:{' '}
                            {invitation.invitedBy?.firstName ||
                              invitation.invitedBy?.email}
                          </p>
                        </div>
                      </div>
                      <div className='flex gap-2'>
                        <Button
                          onClick={() =>
                            handleRespondToInvitation({
                              id: invitation.organization._id,
                              input: { response: 'accepted' },
                            })
                          }
                          disabled={isRespondingToInvitation}
                        >
                          {isRespondingToInvitation && (
                            <Loader2 className='w-4 h-4 animate-spin' />
                          )}
                          Accept
                        </Button>
                        <Button
                          variant='ghost'
                          onClick={() =>
                            handleRespondToInvitation({
                              id: invitation.organization._id,
                              input: { response: 'rejected' },
                            })
                          }
                          disabled={isRespondingToInvitation}
                        >
                          Reject
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {invitations?.length === 0 && (
                <div className='text-center text-default-600 py-8'>
                  No pending invitations
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};
