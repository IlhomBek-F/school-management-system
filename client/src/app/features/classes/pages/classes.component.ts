import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal, type OnInit } from '@angular/core';
import { PageTitleComponent } from "@shared/components/page-title/page-title.component";
import { DropdownModule } from "primeng/dropdown";
import { Button } from "primeng/button";
import { TableModule } from "primeng/table";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { UpsertClassModalCompoment } from '@components/upsert-class-modal/upsert-class-modal.compoment';
import { ActivatedRoute, Router } from '@angular/router';
import { SchoolStatsCardComponent } from '@shared/components/stats-card/stats-card.component';
import { SelectInputComponent } from '@shared/components/dynamic-form/select-input/select-input.component';
import { ClassesTableViewListComponent } from '@components/classes-table-view-list/classes-table-view-list.component';
import { EmptyListComponent } from '@shared/components/empty-list/empty-list.component';
import { TextInputComponent } from '@shared/components/dynamic-form/text-input/text-input.component';
import { ClassesGridViewListComponent } from '@components/classes-grid-view-list/classes-grid-view-list.component';
import { DeleteConfirmDialogService } from '@core/services/delete-confirm-dialog.service';
import { ToastService } from '@core/services/toast.service';
import { ConfirmationService } from 'primeng/api';
import { DropdownOption, Meta } from '@core/models/base';
import { ViewModeEnum } from '@core/enums/view-mode.enum';
import { GRADES } from 'app/utils/constants';
import { ClassListRes, ClassModel, ClassStats, UpsertClassPayload } from '../models';
import { ClassesService } from '../services/classes.services';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { finalize } from 'rxjs';
import { StatsService } from '@core/services/stats.service';

@UntilDestroy()
@Component({
  selector: 'school-classes.component',
  imports: [
    PageTitleComponent,
    DropdownModule, Button,
    TableModule, FormsModule, ReactiveFormsModule,
    CommonModule, SchoolStatsCardComponent,
    ClassesGridViewListComponent, TextInputComponent,
    SelectInputComponent, ClassesTableViewListComponent, EmptyListComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss',
  providers: [ClassesService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ClassesComponent implements OnInit {
  loading = signal(false);
  loadingStats = signal(false);
  VIEW_MODE = ViewModeEnum;
  classes = signal<ClassModel[]>([]);

  viewMode: string = ViewModeEnum.GRID;
  grades: DropdownOption[] = GRADES;

  filterFormGroup = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
    grade_id: new FormControl(0, { nonNullable: true }),
    page: new FormControl(1, { nonNullable: true }),
    per_page: new FormControl(10, { nonNullable: true })
  })

  classMeta = signal<Meta>({
    total: 0,
    per_page: this.filterFormGroup.get('per_page')?.value || 5,
    current_page: this.filterFormGroup.get('page')?.value || 1
  });

  classStats = signal<ClassStats>({
    total_classes: 0,
    active_classes: 0,
    total_enrollments: 0,
    avg_capacity: 0
  })

  private _dialogService = inject(DialogService)
  private _router = inject(Router)
  private _activeRoute = inject(ActivatedRoute)
  private _confirmService = inject(DeleteConfirmDialogService)
  private _messageService = inject(ToastService)
  private _classessService = inject(ClassesService)
  private _statsService = inject(StatsService)

  ngOnInit(): void {
    this._getClassess();
    this._getClassStats();
  }

  setViewMode(mode: string): void {
    this.viewMode = mode;
  }

  upsertClass(classObj?: UpsertClassPayload): void {
    const loading = signal(false);
    const dialogRef = this._dialogService.open(UpsertClassModalCompoment, {
      focusOnShow: false,
      dismissableMask: true,
      modal: true,
      header: classObj ? 'Edit class' : 'Add new class',
      width: '45%',
      data: {
        loading,
        class: classObj,
        footer: {
          onConfirm: (formValue: UpsertClassPayload) => {
            if(classObj?.id) {
              const {updated_at, created_at, id} = classObj;
              this.updateClass({...formValue, updated_at, created_at, id }, loading, dialogRef)
            } else {
              this._createClass(formValue, loading, dialogRef)
            }
          },
          onCancel: () => dialogRef.close()
        }
      }
    })
  }

  viewDetails(cls: ClassModel): void {
    this._router.navigate([cls.id], { relativeTo: this._activeRoute })
  }

  updateClass(formValue: UpsertClassPayload, loading: WritableSignal<boolean>, dialogRef: DynamicDialogRef) {
    loading.set(true)
    formValue.schedule_info.class_days_ids = formValue.schedule_info.class_days_ids.map((n: any) => n?.value)
    this._classessService.update(formValue)
     .pipe(
      finalize(() => loading.set(false)),
      untilDestroyed(this)
     ).subscribe({
      next: () => {
        this._messageService.success("Class updated successfully")
        dialogRef.close()
      }, error: () => {
        this._messageService.error("Failed updating class")
      }
     })
  }

  deleteClass(classObj: ClassModel) {
    this._confirmService.confirm((ref: ConfirmationService) => {
      this._confirmService.loading$.next(true)
      this._classessService.delete(classObj.id)
        .pipe(
          finalize(() => this._confirmService.loading$.next(false)),
          untilDestroyed(this)
        ).subscribe({
          next: () => {
            this._messageService.success("Class deleted successfully");
            this._getClassess();
            ref.close();
          }, error: () => {
            this._messageService.error("Failed deleting class")
          }
        })
    })
  }

  private _createClass(formValue: UpsertClassPayload, loading: WritableSignal<boolean>, dialogRef: DynamicDialogRef) {
    this._classessService.create(formValue)
     .pipe(
      finalize(() => loading.set(false)),
      untilDestroyed(this)
     ).subscribe({
      next: () => {
         this._getClassess();
         dialogRef.close();
         this._messageService.success("Class created successfully")
      }, error: () => {
         this._messageService.error("Failed creating class")
      }
     })
  }

  private _getClassess() {
    this.loading.set(true);
    this._classessService.retrieveAll<ClassListRes>()
      .pipe(
        finalize(() => this.loading.set(false)),
        untilDestroyed(this)
      ).subscribe({
        next: (res) => {
          this.classes.set(res.data);
          this.classMeta.set(res.meta);
        }, error: (err) => {
          this._messageService.error("Failed fetching classes")
        }
      })
  }

  private _getClassStats() {
    this.loadingStats.set(true)
    this._statsService.getClassStats()
      .pipe(
        finalize(() => this.loadingStats.set(false)),
        untilDestroyed(this)
      ).subscribe({
        next: (res) => {
          this.classStats.set(res.data)
        }, error: () => {
          this._messageService.error("Failed fetching class stats")
        }
      })
  }
}
