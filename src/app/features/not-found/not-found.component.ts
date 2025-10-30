import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'school-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundComponent {
  private _router = inject(Router)

  goHome() {
    this._router.navigate(['/dashboard']);
  }

  goBack() {
    window.history.back();
  }

  navigateTo(path: string) {
    this._router.navigate([path]);
  }
}
