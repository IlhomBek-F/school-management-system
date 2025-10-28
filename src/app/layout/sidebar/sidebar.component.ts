import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { AvatarModule } from "primeng/avatar";
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

export type SidebarItemType = {
  name: string;
  icon: string;
  url: string;
};

@Component({
  selector: 'school-sidebar',
  imports: [AvatarModule, RouterModule, CommonModule, ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  private _router = inject(Router)

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
    name: 'Settings',
    icon: 'pi pi-cog',
    url: '/settings',
  },
];

  ngOnInit(): void { }

  logout() {
    this._router.navigate(['/login'])
  }
}
