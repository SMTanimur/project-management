import { cn } from '@/lib';

import {
  Button,
  buttonVariants,
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useCheckActiveNav } from '@/hooks';
import { IMainMenuItem } from '@/types/config';
import { string } from 'zod';
import { Icons } from '@/components/ui/icons';

interface NavProps extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed: boolean;
  links: IMainMenuItem[];
  closeNav: () => void;
}

export default function Nav({
  links,
  isCollapsed,
  className,
  closeNav,
}: NavProps) {
  const renderLink = ({ items, ...rest }: IMainMenuItem) => {
    const key = `${rest.title}-${rest.href}`;
    if (isCollapsed && items)
      return (
        <NavLinkIconDropdown
          {...rest}
          items={items}
          key={key}
          closeNav={closeNav}
        />
      );

    if (isCollapsed)
      return <NavLinkIcon {...rest} key={key} closeNav={closeNav} />;

    if (items)
      return (
        <NavLinkDropdown
          {...rest}
          items={items}
          key={key}
          closeNav={closeNav}
        />
      );

    return <NavLink {...rest} key={key} closeNav={closeNav} />;
  };
  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        'group border-b bg-background py-2 transition-[max-height,padding] duration-500 data-[collapsed=true]:py-2 md:border-none',
        className
      )}
    >
      <TooltipProvider delayDuration={0}>
        <nav className='grid gap-1 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2'>
          {links.map(renderLink)}
        </nav>
      </TooltipProvider>
    </div>
  );
}

interface NavLinkProps extends IMainMenuItem {
  subLink?: boolean;
  closeNav: () => void;
}

function NavLink({
  title,
  icon,
  label,
  href,
  closeNav,
  subLink = false,
}: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  const Icon = icon ? Icons[icon as keyof typeof Icons] : null;
  return (
    <Link
      href={href as string}
      onClick={closeNav}
      className={cn(
        buttonVariants({
          variant: checkActiveNav(href as string) ? 'secondary' : 'ghost',
          size: 'sm',
        }),
        'h-12 justify-start text-wrap rounded-none px-6',
        subLink && 'h-10 w-full border-l border-l-slate-500 px-2'
      )}
      aria-current={checkActiveNav(href as string) ? 'page' : undefined}
    >
      {Icon && (
        <div className='mr-2'>
          <Icon className='h-5 w-5' />
        </div>
      )}

      {title}
      {label && (
        <div className='ml-2 rounded-lg bg-primary px-1 text-[0.625rem] text-primary-foreground'>
          {label}
        </div>
      )}
    </Link>
  );
}

function NavLinkDropdown({
  title,
  icon,
  label,
  items,
  closeNav,
}: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  const Icon = icon ? Icons[icon as keyof typeof Icons] : null;
  /* Open collapsible by default
   * if one of child element is active */
  const isChildActive = !!items?.find(s => checkActiveNav(s.href as string));

  return (
    <Collapsible defaultOpen={isChildActive}>
      <CollapsibleTrigger
        className='[&[data-state=open]>div>div>svg]:rotate-180 mb-1'
        asChild
      >
        <Button
          variant={ 'secondary'}
          className='w-full justify-start h-10'
        >
          <div className='w-full items-center flex justify-between'>
            <div className='flex items-center'>
              <span className='mr-4'>{Icon && <Icon size={18} />}</span>
              <p
                className={cn(
                  'max-w-[150px] truncate',

                  'translate-x-0 opacity-100'
                )}
              >
                {label}
              </p>
            </div>
            <div
              className={cn('whitespace-nowrap', 'translate-x-0 opacity-100')}
            >
              <ChevronDown
                size={18}
                className='transition-transform duration-200'
              />
            </div>
          </div>
        </Button>
        </CollapsibleTrigger>
      <CollapsibleContent className='collapsibleDropdown' asChild>
        <ul>
          {items!.map(sublink => (
            <li key={sublink.title} className='my-1 ml-8'>
              <NavLink {...sublink} subLink closeNav={closeNav} />
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
}

function NavLinkIcon({ title, icon, label, href }: NavLinkProps) {
  const Icon = icon ? Icons[icon as keyof typeof Icons] : null;
  const { checkActiveNav } = useCheckActiveNav();
  return (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>
        <Link
          href={href as string}
          className={cn(
            buttonVariants({
              variant: checkActiveNav(href as string) ? 'secondary' : 'ghost',
              size: 'icon',
            }),
            'h-12 w-12'
          )}
        >
          {Icon && (
            <div className='mr-2'>
              <Icon className='h-5 w-5' />
            </div>
          )}
          <span className='sr-only'>{title}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side='right' className='flex items-center gap-4'>
        {title}
        {label && (
          <span className='ml-auto text-muted-foreground'>{label}</span>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

function NavLinkIconDropdown({ title, icon, label, items }: NavLinkProps) {
  const { checkActiveNav } = useCheckActiveNav();
  const Icon = icon ? Icons[icon as keyof typeof Icons] : null;
  /* Open collapsible by default
   * if one of child element is active */
  const isChildActive = !!items?.find(s => checkActiveNav(s.href as string));

  return (
    <DropdownMenu>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant={isChildActive ? 'secondary' : 'ghost'}
              size='icon'
              className='h-12 w-12'
            >
              {Icon && <Icon className='h-5 w-5' />}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side='right' className='flex items-center gap-4'>
          {title}{' '}
          {label && (
            <span className='ml-auto text-muted-foreground'>{label}</span>
          )}
          <ChevronDown size={18} className='-rotate-90 text-muted-foreground' />
        </TooltipContent>
      </Tooltip>
      <DropdownMenuContent side='right' align='start' sideOffset={4}>
        <DropdownMenuLabel>
          {title} {label ? `(${label})` : ''}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items!.map(({ title, icon, label, href }) => (
          <DropdownMenuItem key={`${title}-${href}`} asChild>
            <Link
              href={href as string}
              className={`${
                checkActiveNav(href as string) ? 'bg-secondary' : ''
              }`}
            >
              {icon} <span className='ml-2 max-w-52 text-wrap'>{title}</span>
              {label && <span className='ml-auto text-xs'>{label}</span>}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
