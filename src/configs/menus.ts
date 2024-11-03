import { Icons } from '@/components';

export interface MenuItemProps {
  title: string;
  icon?: keyof typeof Icons;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  badge?: string;
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick?: () => void;
}

interface MenuConfig {
  mainNav: MenuItemProps[];
  sidebarNav: {
    modern: MenuItemProps[];
    classic: MenuItemProps[];
  };
}

export const menusConfig: MenuConfig = {
  mainNav: [
    {
      title: 'Dashboard',
      icon: 'dashboard',
      child: [
        {
          title: 'Analytics',
          href: '/dashboard',
          icon: 'graph',
        },
      ],
    },
    {
      title: 'Application',
      icon: 'application',
      child: [
        
        {
          title:"Organizations",
          icon:"organization",
          href:"/organizations"
        },
        {
          title: 'Projects',
          icon: 'monitor',
          href: '/projects',
        },
        
      ],
    },
    {
      title: 'Diagram',
      icon: 'diagram',
      child: [
        {
          title: 'Botflows',
          href: '/botflows',
        },
      ],
    },
  ],
  sidebarNav: {
    modern: [
      {
        title: 'Dashboard',
        icon: 'dashboard',
        child: [
          {
            title: 'Analytics',
            href: '/dashboard',
            icon: 'graph',
          },
        ],
      },
    ],
    classic: [
      {
        title: 'Dashboard',
        icon: 'dashboard',
        child: [
          {
            title: 'Analytics',
            href: '/dashboard',
            icon: 'graph',
          },
        ],
      },
      {
        title: 'Application',
        icon: 'application',
        child: [
          {
            title:"Organizations",
            icon:"organization",
            href:"/organizations"
          },
          {
            title: 'Projects',
            icon: 'monitor',
            href: '/projects',
          },
        ],
      },
      {
        title: 'Diagram',
        icon: 'diagram',
        child: [
          {
            title: 'Botflows',
            href: '/botflows',
          },
        ],
      },
    ],
  },
};
