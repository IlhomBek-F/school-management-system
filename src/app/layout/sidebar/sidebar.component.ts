import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { AvatarModule } from "primeng/avatar";
import { SIDEBAR_ITEMS, SidebarItemType } from './constant';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'school-sidebar',
  imports: [AvatarModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent implements OnInit {
  SIDEBAR_ITEMS: SidebarItemType[] = SIDEBAR_ITEMS;

  ngOnInit(): void { }

}
