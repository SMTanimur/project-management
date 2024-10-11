'use client';
import { Icons } from '@/components/ui';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth, useUser } from '@/hooks';
import Image from 'next/image';
import Link from 'next/link';

export const ProfileInfo = () => {
  const { profile } = useUser();
  const { logout } = useAuth();
  const { data, isPending } = profile;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=' cursor-pointer'>
        <div className=' flex items-center  '>
          {data?.avatar && (
            <Image
              src={data?.avatar}
              alt={data.firstName ?? ''}
              width={36}
              height={36}
              className='rounded-full'
            />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56 p-0' align='end'>
        <DropdownMenuLabel className='flex gap-2 items-center mb-1 p-3'>
          {data?.avatar && (
            <Image
              src={data?.avatar}
              alt={data.firstName ?? ''}
              width={36}
              height={36}
              className='rounded-full'
            />
          )}
          <div>
            <div className='text-sm font-medium text-default-800 capitalize '>
              {data?.firstName ?? 'sdgds' + data?.lastName ?? 'sdgsdg'}
            </div>
            <Link
              href='/dashboard'
              className='text-xs text-default-600 hover:text-primary'
            >
             {data?.email}
            </Link>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <Link href={'/profile'} className='cursor-pointer'>
            <DropdownMenuItem className='flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer'>
              <Icons.user className='w-4 h-4' />
              Profile
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuSeparator className='mb-0 dark:bg-background' />
        <DropdownMenuItem
          onClick={logout}
          className='flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 dark:hover:bg-background cursor-pointer'
        >
          <Icons.logout className='w-4 h-4' />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
