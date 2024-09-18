'use client';

import type { ReactNode } from 'react';

import Link from 'next/link';


import { Store } from 'lucide-react';



import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from '@/components/ui';
import { MainMenuItem } from '@/types/config';
import { cn } from '@/lib';

type MainMenuProps = {
  items?: MainMenuItem[];
};
export function MainMenu({ items }: MainMenuProps) {
  return (
    <nav
      className={`
        hidden gap-6

        lg:flex
      `}
    >
      <Link
        aria-label='Home'
        className={`
          hidden items-center space-x-2

          lg:flex
        `}
        href='/'
      >
        <Store className='size-6' />
        <span className='sr-only'>SMTR</span>
        <span
          className={`
            hidden font-bold

            lg:inline-block
          `}
        >
        SMTR
        </span>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          {items?.[0]?.items ? (
            <NavigationMenuItem>
              <NavigationMenuTrigger className='h-auto'>
                {items[0].title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul
                  className={`
                    grid gap-3 p-6

                    lg:w-[500px] lg:grid-cols-[.75fr_1fr]

                    md:w-[400px]
                  `}
                >
                
                  {items[0].items.map(item => (
                    <ListItem
                      href={item.href as string}
                      key={item.title}
                      title={item.title as string}
                    >
                      {item.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : null}
          {items
            ?.filter(item => item.title !== items[0]?.title)
            .map(item =>
              item?.items ? (
                <NavigationMenuItem key={item.title}>
                  <NavigationMenuTrigger className='h-auto capitalize'>
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul
                      className={`
                        grid w-[400px] gap-3 p-4

                        lg:w-[600px]

                        md:w-[500px] md:grid-cols-2
                      `}
                    >
                      {item.items.map(subItem => (
                        <ListItem
                          href={subItem.href as string}
                          key={subItem.title}
                          title={subItem.title as string}
                        >
                          {subItem.description}
                        </ListItem>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                item.href && (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          'h-auto font-medium'
                        )}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                )
              )
            )}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

type ListItemProps = {
  children: ReactNode;
  className?: string;
  href: string;
  title: string;
};

const ListItem = ({
  children,
  className,
  href,
  title,
  ...props
}: ListItemProps) => (
  <li>
    <NavigationMenuLink asChild>
      <Link
        className={cn(
          `
            block select-none space-y-1 rounded-lg p-3 leading-none no-underline
            outline-none transition-colors

            focus:bg-accent focus:text-accent-foreground

            hover:bg-accent hover:text-accent-foreground
          `,
          className
        )}
        href={href}
        {...props}
      >
        <div className='text-sm font-medium leading-none'>{title}</div>
        <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
          {children}
        </p>
      </Link>
    </NavigationMenuLink>
  </li>
);

ListItem.displayName = 'ListItem';
