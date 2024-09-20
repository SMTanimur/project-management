import { IMainMenuItem } from '@/types/config';

export const getSidebarNavigation: IMainMenuItem[] = [
  {
    id: '1',
    title: 'Dashboard',
    icon: 'home',

    href: '/dashboard',
    items: [
      {
        id: '1',
        title: 'Editor',
        href: '/dashboard/editor',
      },
    ],
  },
  {
    id: '2',
    title: 'Apps',
    icon: 'layout',
    items: [
      {
        id: '1',
        title: 'Todo List',

        href: '/apps/todo-list',
        icon: 'todo',
      },
      {
        id: '3',
        title: 'Chat',

        href: '/apps/chat',
        icon: 'chat',
      },
      {
        id: '5',
        title: 'Mailbox',

        href: '/apps/mailbox',
        icon: 'mail',
      },
      {
        id: '6',
        title: 'Scrumboard',
        href: '/apps/scrumboard',
        icon: 'clipboard',
      },
    ],
  },
];
