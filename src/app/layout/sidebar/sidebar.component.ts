import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AvatarModule } from "primeng/avatar";
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { QuickStatsComponent } from './components/quick-stats/quick-stats.component';
import { SidebarFooterComponent } from "./components/footer/footer.component";

export type SidebarItemType = {
  name: string;
  icon: string;
  url: string;
};

@Component({
  selector: 'school-sidebar',
  imports: [AvatarModule, RouterModule, CommonModule, ButtonModule, QuickStatsComponent, SidebarFooterComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  SIDEBAR_ITEMS: SidebarItemType[] = [{
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
   name: 'Rooms',
   icon: 'pi pi-home',
   url: '/rooms'
  },
  {
    name: 'Settings',
    icon: 'pi pi-cog',
    url: '/settings',
  },
];
}
