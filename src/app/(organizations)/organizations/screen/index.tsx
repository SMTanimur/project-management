'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useGetOrganizations } from '@/hooks';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardContent,
  CardHeader,
  CreateOrganizationForm,
  Dialog,
  DialogContent,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';

export const OrganizationsScreen = () => {
  const {
    organizations: ownOrganizations,
    isPending: isPendingOwnOrganizations,
  } = useGetOrganizations({ type: 'own' });
  const {
    organizations: joinedOrganizations,
    isPending: isPendingJoinedOrganizations,
  } = useGetOrganizations({ type: 'joined' });
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
          </TabsList>

          <TabsContent value='Created' className='lg:grid lg:grid-cols-3 gap-4'>
            {ownOrganizations?.map(organization => (
              <Card key={organization?._id} className='w-full'>
                <CardHeader className=' py-0 flex flex-row justify-between w-full  items-center gap-3 border-none mb-0'>
                  <div className=''>
                    
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
                      <DropdownMenuItem className='cursor-pointer'>
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem className='cursor-pointer'>
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
                        <Avatar
                          className='rounded h-12 w-12'
                          
                        >
                          <AvatarFallback className='rounded uppercase text-success'
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
        </Tabs>
      </div>
    </section>
  );
};
