import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { SkeletonModule } from "primeng/skeleton";
import { TeacherStatusCardsComponent } from "../teacher-status-cards/teacher-status-cards.component";
import { CommonModule } from '@angular/common';
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { DialogService } from 'primeng/dynamicdialog';
import { UpsertTeacherModalComponent } from '../../upsert-teacher-modal/upsert-teacher-modal.component';

@Component({
  selector: 'school-teacher-view-detail-header',
  imports: [SkeletonModule, TeacherStatusCardsComponent, CommonModule, TagModule, ButtonModule],
  templateUrl: './teacher-view-detail-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherViewDetailHeaderComponent {
  teacher = input.required<any>()
  loading = input(false)

  private _dialogService = inject(DialogService)

  getStatusSeverity(status: string): string {
    return status === 'Active' ? 'success' : 'warning';
  }

  getRatingStars(rating: number): string[] {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push('full');
    }
    if (hasHalfStar) {
      stars.push('half');
    }
    while (stars.length < 5) {
      stars.push('empty');
    }
    return stars;
  }

  editTeacher(): void {
    const dialogRef = this._dialogService.open<any>(UpsertTeacherModalComponent, {
      focusOnShow: false,
      dismissableMask: true,
      modal: true,
      header: 'Edit teacher info',
      width: '45%',
      data: {
        teacher: this.teacher,
        footer: {
          onConfirm: (formValue: any) => console.log(formValue),
          onCancel: () => dialogRef.close()
        }
      }
    })
  }

  downloadReport(): void {
    console.log('Download report');
  }

  sendMessage(): void {
    console.log('Send message');
  }
}
