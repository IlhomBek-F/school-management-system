export type SidebarItemType = {
  name: string;
  icon: string;
  url: string;
};

export const SIDEBAR_ITEMS: SidebarItemType[] = [
  {
    name: 'Dashboard',
    icon: 'pi pi-home',
    url: '/dashboard',
  },
  {
    name: 'Students',
    icon: 'pi pi-users',
    url: '/students',
  },
  {
    name: 'Teachers',
    icon: 'pi pi-users',
    url: '/teachers',
  },
  {
    name: 'Classes',
    icon: 'pi pi-book',
    url: '/classes',
  },
  {
    name: 'Settings',
    icon: 'pi pi-cog',
    url: '/settings',
  },
];
