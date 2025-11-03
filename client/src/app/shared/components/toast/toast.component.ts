import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ToastService } from '@core/services/toast.service';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'school-toast',
  imports: [CommonModule, ToastModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
   private _toastService = inject(ToastService)

   onCloseClick() {
    this._toastService.clear();
  }
}
