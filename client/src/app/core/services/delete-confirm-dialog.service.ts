import { inject, Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeleteConfirmDialogService {
  loading$ = new Subject()

  private _confirmService = inject(ConfirmationService);
  private _ref!: ConfirmationService;
  private _fc!: (ref: ConfirmationService) => void;

  confirm(onAccept: (ref: ConfirmationService) => void) {
       this._fc = onAccept;
       this._ref = this._confirmService.confirm({
            message: 'Do you want to delete this record?',
            header: 'Danger Zone',
            closable: false,
            icon: 'pi pi-info-circle',
            rejectLabel: 'Cancel',
            rejectButtonProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true,
            },
            acceptButtonProps: {
                label: 'Delete',
                severity: 'danger',
            },
        });
    }

  accept() {
    this._fc(this._ref)
  }

  close() {
    this._ref.close()
  }
}
