import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal, type OnInit } from '@angular/core';
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { EmptyListComponent } from '@shared/components/empty-list/empty-list.component';
import { TextInputComponent } from '@shared/components/dynamic-form/text-input/text-input.component';
import { SchoolStatsCardComponent } from '@shared/components/stats-card/stats-card.component';
import { SelectInputComponent } from '@shared/components/dynamic-form/select-input/select-input.component';
import { PageTitleComponent } from '@shared/components/page-title/page-title.component';
import { StudentTableViewListComponent } from '../components/view-list/student-table-view-list/student-table-view-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentGridViewListComponent } from '../components/view-list/student-grid-view-list/student-grid-view-list.component';
import { UpsertStudentModalComponent } from '../components/upsert-student-modal/upsert-student-modal.component';
import { ConfirmationService } from 'primeng/api';
import { DeleteConfirmDialogService } from '@core/services/delete-confirm-dialog.service';
import { ToastService } from '@core/services/toast.service';
import { ViewModeEnum } from '@core/enums/view-mode.enum';
import { StudentsService } from '../services/students.service';
import { Student, StudentListSuccessRes, UpsertStudentPayload } from '../models';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { finalize } from 'rxjs';
import { Meta } from '@core/models/base';
import { GRADES } from 'app/utils/constants';
import { StudentStats } from '@core/models/stats';
import { StatsService } from '@core/services/stats.service';

@UntilDestroy()
@Component({
  selector: 'school-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  imports: [PageTitleComponent,
    Button, CommonModule,
    TableModule, TagModule,
    DropdownModule, FormsModule, ReactiveFormsModule,
    InputTextModule, StudentGridViewListComponent,
    SchoolStatsCardComponent, EmptyListComponent,
    StudentTableViewListComponent, TextInputComponent, SelectInputComponent],
  providers: [DialogService, StudentsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsComponent implements OnInit {
  loading = signal(false)
  loadingStats = signal(false)

  VIEW_MODE = ViewModeEnum;
  viewMode = signal(ViewModeEnum.GRID);
  grades = GRADES;

  filterFormGroup = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
    grade_id: new FormControl('', { nonNullable: true }),
    page: new FormControl(1, { nonNullable: true }),
  })

  students: WritableSignal<Student[]> = signal([]);
  studentStats: WritableSignal<StudentStats> = signal({
    total_students: 0,
    avg_attendance: 0,
    active_classes: 0,
    avg_gpa: 0
  })

  studentsMeta: WritableSignal<Meta> = signal({
    total: 0,
    per_page: this.filterFormGroup.get('per_page')?.value || 5,
    current_page: this.filterFormGroup.get('page')?.value || 1
  })

  private _dialogService = inject(DialogService)
  private _router = inject(Router)
  private _activeRoute = inject(ActivatedRoute)
  private _confirmService = inject(DeleteConfirmDialogService)
  private _messageService = inject(ToastService)
  private _studentsService = inject(StudentsService)
  private _statsService = inject(StatsService)

  ngOnInit(): void {
    this._getStudentList()
    this._getStudentStats()
  }

  addStudent(): void {
    const loading = signal(false);

    const dialogRef = this._dialogService.open(UpsertStudentModalComponent, {
      focusOnShow: false,
      dismissableMask: true,
      modal: true,
      header: 'Add new student',
      width: '45%',
      data: {
        loading,
        footer: {
          onConfirm: (formValue: any) => {
            loading.set(true)
            this._createStudent(formValue, loading, dialogRef)
          },
          onCancel: () => dialogRef.close()
        }
      }
    })
  }

  viewProfile(student: Student): void {
    this._router.navigate([student.id], { relativeTo: this._activeRoute })
  }

  deleteStudent(student: Student) {
    const deleteConfirm = (ref: ConfirmationService) => {
      this._confirmService.loading$.next(true)
      this._studentsService.delete(student.id)
        .pipe(
          finalize(() => this._confirmService.loading$.next(false)),
          untilDestroyed(this)
        ).subscribe({
          next: () => {
            this._messageService.success("Student deleted successfully");
            this._getStudentList()
            ref.close();
          }, error: (err) => {
            this._messageService.error(err.message || "Failed deleting student")
          }
        })
    }

    this._confirmService.confirm(deleteConfirm)
  }

  private _getStudentList() {
    this.loading.set(true)
    this._studentsService.retrieveAll<StudentListSuccessRes>({})
      .pipe(
        finalize(() => this.loading.set(false)),
        untilDestroyed(this)
      ).subscribe({
        next: (res) => {
          this.students.set(res.data)
          this.studentsMeta.set(res.meta)
        }, error: (err) => {
          this._messageService.error(err.message || "Failed getting student list")
        }
      })
  }

  private _getStudentStats() {
    this.loadingStats.set(true)
    this._statsService.getStudentStats()
     .pipe(
      finalize(() => this.loadingStats.set(false)),
      untilDestroyed(this)
     ).subscribe({
      next: (res) => {
         this.studentStats.set(res.data)
      }, error: (err) => {
         this._messageService.error(err.message || "Failed getting student stats")
      }
     })
  }

  private _createStudent(formValue: UpsertStudentPayload, loading: WritableSignal<boolean>, dialogref: DynamicDialogRef) {
    this._studentsService.create<StudentListSuccessRes, UpsertStudentPayload>(formValue)
      .pipe(
        finalize(() => loading.set(false)),
        untilDestroyed(this)
      ).subscribe({
        next: () => {
          this._messageService.success("Added new student")
          this._getStudentList()
          dialogref.close()
        }, error: (err) => {
          this._messageService.error(err.message || "Failed creating new student")
        }
      })
  }
}
