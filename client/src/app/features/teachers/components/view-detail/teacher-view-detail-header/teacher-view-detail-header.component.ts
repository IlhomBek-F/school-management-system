import { ChangeDetectionStrategy, Component, inject, input, signal, WritableSignal } from '@angular/core';
import { SkeletonModule } from "primeng/skeleton";
import { TeacherStatusCardsComponent } from "../teacher-status-cards/teacher-status-cards.component";
import { CommonModule } from '@angular/common';
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UpsertTeacherModalComponent } from '../../upsert-teacher-modal/upsert-teacher-modal.component';
import { Teacher, TeacherSuccessRes, UpsertTeacherPayload } from 'app/features/teachers/models';
import { RandomBgColorPipe } from '@core/pipes/random-bg-color-pipe';
import { DEPARTMENTS_MAP } from 'app/utils/constants';
import { TeachersService } from 'app/features/teachers/services/teachers.service';
import { finalize } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ToastService } from '@core/services/toast.service';

@UntilDestroy()
@Component({
  selector: 'school-teacher-view-detail-header',
  imports: [SkeletonModule, TeacherStatusCardsComponent, CommonModule, TagModule, ButtonModule, RandomBgColorPipe],
  templateUrl: './teacher-view-detail-header.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherViewDetailHeaderComponent {
  teacher = input.required<Teacher>()
  loading = input(false)
  DEPARTMENTS_MAP = DEPARTMENTS_MAP;
  private _dialogService = inject(DialogService)
  private _teachersService = inject(TeachersService)
  private _messageService = inject(ToastService)

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
    const loading = signal(false)
    const dialogRef = this._dialogService.open<any>(UpsertTeacherModalComponent, {
      focusOnShow: false,
      dismissableMask: true,
      modal: true,
      header: 'Edit teacher info',
      width: '45%',
      data: {
        loading,
        teacher: this.teacher(),
        footer: {
          onConfirm: (formValue: UpsertTeacherPayload) => {
            loading.set(true)
            this._updateTeacher(formValue, loading, dialogRef)
          },
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

  private _updateTeacher(formValue: UpsertTeacherPayload, loading: WritableSignal<boolean>, dialogRef: DynamicDialogRef) {
    const { id, created_at, updated_at } = this.teacher();
    this._teachersService.update<TeacherSuccessRes, UpsertTeacherPayload>({ ...formValue, id, created_at, updated_at })
      .pipe(
        finalize(() => loading.set(false)),
        untilDestroyed(this)
      ).subscribe({
        next: () => {
          this._messageService.success("Teacher updated successfully")
          dialogRef.close()
        }, error: () => {
          this._messageService.error("Failed updating teacher")
        }
      })
  }
}
