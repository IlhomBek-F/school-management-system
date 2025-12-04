import { ChangeDetectionStrategy, Component, inject, signal, type OnInit } from '@angular/core';
import { PageTitleComponent } from "@shared/components/page-title/page-title.component";
import { DropdownModule } from "primeng/dropdown";
import { Button } from "primeng/button";
import { TableModule } from "primeng/table";
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
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
import { ClassStatus } from '../enums';
import { StatusSeverityEnum } from '@core/enums/status-severity.enum';
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
    TableModule, FormsModule,
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

  statuses: DropdownOption[] = [
    { label: 'All Status', value: 'all' },
    { label: 'Active', value: ClassStatus.ACTIVE },
    { label: 'Cancelled', value: ClassStatus.CANCELLED }
  ];

  filterFormGroup = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
    grade_id: new FormControl(0, { nonNullable: true }),
    page: new FormControl(1, { nonNullable: true }),
    per_page: new FormControl(10, {nonNullable: true})
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
    const dialogRef = this._dialogService.open(UpsertClassModalCompoment, {
      focusOnShow: false,
      dismissableMask: true,
      modal: true,
      header: classObj ? 'Edit class' : 'Add new class',
      width: '45%',
      data: {
        class: classObj,
        footer: {
          onConfirm: (formValue: any) => console.log(formValue),
          onCancel: () => dialogRef.close()
        }
      }
    })
  }

  viewDetails(cls: ClassModel): void {
   this._router.navigate([cls.id], {relativeTo: this._activeRoute})
  }

  deleteClass(classObj: any) {
        this._confirmService.confirm((ref: ConfirmationService) => {
          this._confirmService.loading$.next(true)
          setTimeout(() => {
            this._confirmService.loading$.next(false);
            this._messageService.success("Class deleted successfully")
            ref.close()
          }, 3000)
        })
  }

  getStatusSeverity(status: string): string {
    switch(status) {
      case ClassStatus.ACTIVE: return StatusSeverityEnum.SUCCESS;
      case ClassStatus.CANCELLED: return StatusSeverityEnum.DANGER;
      default: return StatusSeverityEnum.INFO;
    }
  }

  getCapacityPercentage(students: number, capacity: number): number {
    return Math.round((students / capacity) * 100);
  }

  getCapacitySeverity(percentage: number): string {
    if (percentage >= 90) return StatusSeverityEnum.DANGER;
    if (percentage >= 70) return StatusSeverityEnum.WARNING;
    return StatusSeverityEnum.SUCCESS;
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
