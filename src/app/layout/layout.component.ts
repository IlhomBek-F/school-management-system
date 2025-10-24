import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'school-layout-component',
  imports: [DrawerModule, ButtonModule, AvatarModule, RouterOutlet, RouterModule, CommonModule, RouterLinkActive],
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
