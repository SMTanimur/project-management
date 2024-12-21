import { type Icons } from '@/components/ui/icons';

export interface NavItem {
  title?: string;
  href?: string;
  id?: string;
  type:string
  component?: any;
  targetId?: string;
  description?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: keyof typeof Icons;
  label?: string;
}

export interface TypesIcon {
  value: keyof typeof Icons;
  label: string;
}

export interface NavItemWithChildren extends NavItem {
  items: NavItemWithChildren[];
}

export interface NavItemWithOptionalChildren extends NavItem {
  items?: NavItemWithChildren[];
}

export interface ISidebarNavigation {
  label: string;
  type: string;
  children: NavItem[];
}

export type color = "primary" | "info" | "warning" | "success" | "destructive" | "secondary";