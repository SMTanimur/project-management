import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarImage,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from '@/components';
import { useGetUsers, useOrganization, useUser } from '@/hooks';
import { Organization } from '@/types';
import { Plus, Search } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type OrganizationHeaderProps = {
  organization: Organization;
};
export const OrganizationHeader = ({
  organization,
}: OrganizationHeaderProps) => {
  const [search, setSearch] = useState('');
  const [email, setEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const { data: user } = useUser();
  const { users = [], isPending } = useGetUsers(search);

  const { handleInviteUser, isInviting } = useOrganization();

  const filteredUsers = Array.isArray(users)
    ? users.filter(user =>
        user.email.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <Card className='mb-6'>
      <CardHeader className='flex-row items-center'>
        <CardTitle className='flex-1'>{organization?.name}</CardTitle>
        <div className='flex-none flex items-center gap-3'>
          <div className='relative'>
            <Search className='w-4 h-4 absolute top-1/2 -translate-y-1/2 left-2 text-default-400' />
            <Input
              type='search'
              className='pl-7'
              placeholder='Search users by email'
              value={ search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && Array.isArray(filteredUsers) && (
              <Card className='absolute z-[9999] mt-1 w-full max-h-60 overflow-auto bg-white border rounded-md shadow-lg'>
                {filteredUsers.map(user => (
                  <div
                    key={user._id}
                    className='p-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2'
                    onClick={() => {
                      setSearch(user.email);
                      setEmail(user.email);
                  
                    }}
                  >
                    <Avatar className='h-8 w-8'>
                      <AvatarImage src={user.avatar} alt={user.firstName} />
                      <AvatarFallback>
                        {user.firstName?.charAt(0)}
                        {user.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                      <span className='text-sm font-medium'>
                        {user.firstName} {user.lastName}
                      </span>
                      <span className='text-xs text-gray-500'>
                        {user.email}
                      </span>
                    </div>
                  </div>
                ))}
              </Card>
            )}
          </div>
          <div>
            <Button
              type='button'
              className='whitespace-nowrap'
              onClick={() => {
                handleInviteUser({
                  email: email,
                  invitedBy: user?._id as string,
                  organization: organization._id,
                });
                setEmail('');
                setSearch('');
              }}
              disabled={isInviting || !email}
            >
              <Plus className='w-4 h-4 mr-1' />
              {isInviting ? 'Inviting...' : 'Invite member'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className='border-b border-default-200'>
        <div className='flex flex-col md:flex-row gap-4'>
          <div className='flex-none'>
            <div className='h-[148px] w-[148px] rounded'>
              {organization?.logo ? (
                <Image
                  src={organization?.logo as string}
                  alt='smtr-dashboard'
                  className='w-full h-full object-cover rounded'
                />
              ) : (
                <div
                  className='w-full h-full bg-default-200 rounded'
                  style={{
                    backgroundColor: organization?.brandColor,
                  }}
                >
                  <h1 className='text-white text-2xl font-bold'>
                    {organization?.logoText}
                  </h1>
                </div>
              )}
            </div>
          </div>
          <div className='flex-1'>
            <div className='flex flex-wrap justify-between gap-4'>
              <div className='text-xl font-medium text-default-950 truncate'>
                {organization?.description}
              </div>
            </div>
            <div className='text-sm text-default-600 w-full  mt-1'>
              Create a Brand logo design for a smtr-dashboard Admin. Logo should
              be match our dashboard theme.
            </div>
            <div className='mt-3 flex flex-wrap items-center gap-2 lg:gap-6'>
              {organization?.members && organization.members.length > 0 && (
                <div>
                  <AvatarGroup max={3} total={organization.members.length}>
                    {organization?.members.map((member, index) => (
                      <Avatar
                        key={index}
                        className=' ring-1 ring-background ring-offset-[2px]  ring-offset-background'
                      >
                        <AvatarImage src={member?.user?.avatar} />
                        <AvatarFallback>
                          {member?.user?.firstName?.charAt(0)}
                          {member?.user?.lastName?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
