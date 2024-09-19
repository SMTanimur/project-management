import { IMainMenuItem } from '@/types/config';

export const getSidebarNavigation = (pathName: string): IMainMenuItem[] => {
  return [
    {
      id: '1',
      title: 'Dashboard',
      icon: 'home',
      active: pathName === '/dashboard',
      href: '/dashboard',
      items: [
        {
          id: '1',
          title: 'Editor',
          active: pathName === '/dashboard/editor',
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
          active: pathName === '/apps/todo-list',
          href: '/apps/todo-list',
          icon: 'todo',
        },
        {
          id: '3',
          title: 'Chat',
          active: pathName === '/apps/chat',
          href: '/apps/chat',
          icon: 'chat',
        },
        {
          id: '5',
          title: 'Mailbox',
          active: pathName === '/apps/mailbox',
          href: '/apps/mailbox',
          icon: 'mail',
        },
        {
          id: '6',
          title: 'Scrumboard',
          active: pathName === '/apps/scrumboard',
          href: '/apps/scrumboard',
          icon: 'clipboard',
        },
      ],
    },
  ];
  
}