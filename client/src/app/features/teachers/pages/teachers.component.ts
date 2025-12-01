import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal, type OnInit } from '@angular/core';
import { PageTitleComponent } from "@shared/components/page-title/page-title.component";
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SchoolStatsCardComponent } from "@shared/components/stats-card/stats-card.component";
import { EmptyListComponent } from "@shared/components/empty-list/empty-list.component";
import { TextInputComponent } from "@shared/components/dynamic-form/text-input/text-input.component";
import { SelectInputComponent } from "@shared/components/dynamic-form/select-input/select-input.component";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UpsertTeacherModalComponent } from '../components/upsert-teacher-modal/upsert-teacher-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherTableViewListComponent } from '../components/view-list/teacher-table-view-list/teacher-table-view-list.component';
import { TeacherGridViewListComponent } from '../components/view-list/teacher-grid-view-list/teacher-grid-view-list.component';
import { DeleteConfirmDialogService } from '@core/services/delete-confirm-dialog.service';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from '@core/services/toast.service';
import { DropdownOption, Meta } from '@core/models/base';
import { ViewModeEnum } from '@core/enums/view-mode.enum';
import { TeachersService } from '../services/teachers.service';
import { Teacher, TeacherListSuccessRes, TeacherQuery, TeacherStats, TeacherSuccessRes, UpsertTeacherPayload } from '../models';
import { DEPARTMENTS } from 'app/utils/constants';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime, distinctUntilChanged, finalize } from 'rxjs';
import { StatsService } from '@core/services/stats.service';
import { PaginatorState, PaginatorModule } from 'primeng/paginator';

@UntilDestroy()
@Component({
  selector: 'school-teachers',
  imports: [PageTitleComponent, TagModule, ReactiveFormsModule,
    ButtonModule, TableModule,
    DropdownModule, CommonModule,
    FormsModule, SchoolStatsCardComponent,
    EmptyListComponent, TextInputComponent, SelectInputComponent, TeacherTableViewListComponent, TeacherGridViewListComponent, PaginatorModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
  providers: [DialogService, TeachersService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachersComponent implements OnInit {
  loading = signal(false)
  loadingStats = signal(false)
  VIEW_MODE = ViewModeEnum;
  viewMode = signal(this.VIEW_MODE.GRID)
  departments: DropdownOption[] = DEPARTMENTS

  filterFormGroup = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
    department_id: new FormControl(0, { nonNullable: true }),
    page: new FormControl(1, { nonNullable: true }),
    per_page: new FormControl(10, { nonNullable: true })
  })

  teachers: WritableSignal<Teacher[]> = signal([]);
  teacherStats: WritableSignal<TeacherStats> = signal({
    total_teachers: 0,
    avg_experience: 0,
    total_students: 0,
    avg_rating: 0
  })

  teachersMeta: WritableSignal<Meta> = signal({
    total: 0,
    per_page: this.filterFormGroup.get('per_page')?.value || 5,
    current_page: this.filterFormGroup.get('page')?.value || 1
  })

  private _dialogService = inject(DialogService)
  private _router = inject(Router)
  private _activeRoute = inject(ActivatedRoute)
  private _confirmService = inject(DeleteConfirmDialogService);
  private _messageService = inject(ToastService)
  private _teachersService = inject(TeachersService)
  private _statsService = inject(StatsService)

  ngOnInit(): void {
    this._getTeacherList()
    this._getTeacherStats()
    this._handleFilterTeacher()
  }

  upsertTeacher(teacher?: any): void {
    const loading = signal(false);

    const dialogRef = this._dialogService.open<any>(UpsertTeacherModalComponent, {
      focusOnShow: false,
      dismissableMask: true,
      modal: true,
      header: 'Add new teacher',
      width: '45%',
      data: {
        loading,
        teacher,
        footer: {
          onConfirm: (formValue: UpsertTeacherPayload) => {
            loading.set(true)
            this._addNewTeacher(formValue, loading, dialogRef)
          },
          onCancel: () => dialogRef.close()
        }
      }
    })
  }

  viewProfile(teacher: any): void {
    this._router.navigate([teacher.id], { relativeTo: this._activeRoute })
  }

  deleteTeacher(teacher: Teacher) {
    this._confirmService.confirm((ref: ConfirmationService) => {
      this._confirmService.loading$.next(true)
      this._teachersService.delete(teacher.id)
        .pipe(
          finalize(() => this._confirmService.loading$.next(false)),
          untilDestroyed(this)
        ).subscribe({
          next: () => {
            this._messageService.success("Teacher deleted successfully")
            this._getTeacherList()
            ref.close()
          }, error: (err) => {
            this._messageService.error(err.message)
          }
        })
    })
  }

  onPageChange({ page = 0 }: PaginatorState) {
    this.filterFormGroup.patchValue({ ...this.filterFormGroup.getRawValue(), page: page + 1 }, { emitEvent: false })
    this._getTeacherList()
  }

  private _handleFilterTeacher() {
    this.filterFormGroup.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged((prev, curr) => {
          return prev.search === curr.search && prev.department_id === curr.department_id
        }),
        untilDestroyed(this)
      ).subscribe((value) => {
        this.filterFormGroup.patchValue({ ...value, page: 1 }, { emitEvent: false })
        this._getTeacherList()
      })
  }

  private _addNewTeacher(teacherPayload: UpsertTeacherPayload, loading: WritableSignal<boolean>, dialogRef: DynamicDialogRef) {
    this._teachersService.create<TeacherSuccessRes, UpsertTeacherPayload>(teacherPayload)
      .pipe(
        finalize(() => loading.set(false)),
        untilDestroyed(this)
      ).subscribe({
        next: () => {
          this._messageService.success("Added new teacher")
          this._getTeacherList()
          dialogRef.close()
        }, error: () => {
          this._messageService.error("Failed adding new teacher")
        }
      })
  }

  private _getTeacherStats() {
    this.loadingStats.set(true)
    this._statsService.getTeacherStats()
      .pipe(
        finalize(() => this.loadingStats.set(false)),
        untilDestroyed(this)
      ).subscribe({
        next: (res) => {
          this.teacherStats.set(res.data)
        }, error: (err) => {
          this._messageService.error("Failed getting teacher stats")
        }
      })
  }

  private _getTeacherList() {
    this.loading.set(true)
    const filterValue: TeacherQuery = this.filterFormGroup.getRawValue();

    this._teachersService.retrieveAll<TeacherListSuccessRes>(filterValue)
      .pipe(
        finalize(() => this.loading.set(false)),
        untilDestroyed(this)
      ).subscribe({
        next: (res) => {
          this.teachers.set(res.data)
          this.teachersMeta.set(res.meta)
        }, error: (err) => {
          this._messageService.error("Failed getting teacher list")
        }
      })
  }
}
