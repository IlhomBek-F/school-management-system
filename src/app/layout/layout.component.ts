import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import {  RouterModule, RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./sidebar/sidebar.component";
import { BreadcrumbComponent } from "@shared/components/breadcrumb/breadcrumb.component";

@Component({
  selector: 'school-layout-component',
  imports: [ButtonModule, RouterOutlet, RouterModule, CommonModule, SidebarComponent, BreadcrumbComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {
  visible = true;
openSubmenu = ''
  ngOnInit(): void { }

  closeCallback(e: any): void {
        // this.drawerRef.close(e);
    }
}
