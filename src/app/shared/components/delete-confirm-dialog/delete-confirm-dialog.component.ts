import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { Button } from "primeng/button";
import { DeleteConfirmDialogService } from '@core/services/delete-confirm-dialog.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'school-delete-confirm-dialog',
  imports: [ConfirmDialogModule, Button, CommonModule],
  template: `
    <p-confirmdialog  [closable]="false" [draggable]="false">
       <ng-template #footer>
          <p-button label="Cancel" outlined size="small" (onClick)="cancel()"></p-button>
          <p-button label="Delete" severity="danger" size="small" (onClick)="confirm()" [loading]="loading$ | async"></p-button>
       </ng-template>
    </p-confirmdialog>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteConfirmDialogComponent {
  private _confirmDialogService = inject(DeleteConfirmDialogService)
  loading$ = this._confirmDialogService.loading$;

  confirm() {
    this._confirmDialogService.accept()
  }

  cancel() {
    this._confirmDialogService.close()
  }
}
