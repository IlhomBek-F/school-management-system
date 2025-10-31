import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { DialogService } from 'primeng/dynamicdialog';
import { UpsertStudentModalComponent } from '../upsert-student-modal/upsert-student-modal.component';
import { StudentViewDetailStatusCardsComponent } from "../student-view-detail-status-cards/student-view-detail-status-cards.component";
import { SkeletonModule } from "primeng/skeleton";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'school-student-view-detail-header',
  imports: [TagModule, ButtonModule, StudentViewDetailStatusCardsComponent, SkeletonModule, CommonModule],
  templateUrl: './student-view-detail-header.component.html',
  styleUrl: './student-view-detail-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentViewDetailHeaderComponent {
  student = input.required<any>()
  loading = input(false)

  private _dialogService = inject(DialogService)

  downloadReport(): void {
    console.log('Download report');
  }

  sendMessage(): void {
    console.log('Send message');
  }

  editStudent(): void {
    const dialogRef = this._dialogService.open<any>(UpsertStudentModalComponent, {
      focusOnShow: false,
      dismissableMask: true,
      modal: true,
      header: 'Edit student info',
      width: '45%',
      data: {
        student: this.student(),
        footer: {
          onConfirm: (formValue: any) => console.log(formValue),
          onCancel: () => dialogRef.close()
        }
      }
    })
  }
}
