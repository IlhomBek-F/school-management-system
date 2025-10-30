import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AvatarModule } from "primeng/avatar";
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'school-sidebar-footer',
  imports: [AvatarModule, ButtonModule],
  templateUrl: './footer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarFooterComponent {
  private _router = inject(Router)

  logout() {
    this._router.navigate(['/login'])
  }
}
