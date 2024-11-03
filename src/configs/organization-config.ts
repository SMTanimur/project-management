import { Icons } from '@/components/ui/icons';
export  type IOrganizationConfig = {
  title: string;
  Icon:  keyof typeof Icons
  href: string;
}


export const organizationConfig: IOrganizationConfig[] = [ 

  {
    title: "Organization",
    Icon: "organization",
    href: "/organizations",
  },
  {
    title: "Projects",
    Icon: "monitor",
    href: "/projects",
  },
  {
    title:"Settings",
    Icon:"settings",
    href:"/organizations/settings"
  }
]