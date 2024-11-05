import { Icons } from '@/components/ui/icons';
export type IOrganizationConfig = {
  title: string;
  label?: string;
  Icon: keyof typeof Icons;
  href: string;
};

export const organizationConfig: IOrganizationConfig[] = [
  {
    title: 'Organization',
    Icon: 'organization',
    href: '/organizations',
  },
  {
    title: 'Projects',
    Icon: 'monitor',
    href: '/projects',
  },
  {
    title: 'Settings',
    Icon: 'settings',
    href: '/organizations/settings',
  },
];

export const organizationSidebarConfig: IOrganizationConfig[] = [
  {
    title: 'Dashboard',
    Icon: 'dashboard',
    href: '/',
  },
  {
    title: 'Messages',
    Icon: 'message',
    href: '/meesages',
  },
  {
    title: 'Tasks',
    Icon: 'task',
    href: '/tasks',
  },
  {
    title: 'My Groups',
    Icon: 'group',
    href: '/groups',
  },
  {
    title: 'Emails',
    Icon: 'email',
    href: '/emails',
  },

  {
    title: 'My Organizations',
    Icon: 'organization',
    href: '/organizations',
  },
];
