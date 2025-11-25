import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal, WritableSignal, type OnInit } from '@angular/core';
import { PageTitleComponent } from "@shared/components/page-title/page-title.component";
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { SchoolStatsCardComponent } from "@shared/components/stats-card/stats-card.component";
import { EmptyListComponent } from "@shared/components/empty-list/empty-list.component";
import { TextInputComponent } from "@shared/components/dynamic-form/text-input/text-input.component";
import { SelectInputComponent } from "@shared/components/dynamic-form/select-input/select-input.component";
import { DialogService } from 'primeng/dynamicdialog';
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
import { Teacher, TeacherStats } from '../models';
import { DEPARTMENTS } from 'app/utils/constants';

@Component({
  selector: 'school-teachers',
  imports: [PageTitleComponent, TagModule,
    ButtonModule, TableModule,
    DropdownModule, CommonModule,
    FormsModule, SchoolStatsCardComponent,
    EmptyListComponent, TextInputComponent, SelectInputComponent, TeacherTableViewListComponent, TeacherGridViewListComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
  providers: [DialogService, TeachersService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachersComponent implements OnInit {
  loading = signal(true)
  VIEW_MODE = ViewModeEnum;
  viewMode = signal(this.VIEW_MODE.GRID)
  departments: DropdownOption[] = DEPARTMENTS

  filterFormGroup = new FormGroup({
    search: new FormControl('', { nonNullable: true }),
    department_id: new FormControl(0, { nonNullable: true }),
    page: new FormControl(1, { nonNullable: true }),
    per_page: new FormControl(10, {nonNullable: true})
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

  // teachers: any[] = [
  //   {
  //     id: 1,
  //     name: 'Dr. Sarah Johnson',
  //     subject: 'Mathematics',
  //     department: 'Science & Math',
  //     email: 'sarah.j@school.edu',
  //     phone: '+1 234-567-8901',
  //     avatar: 'SJ',
  //     experience: 12,
  //     students: 145,
  //     rating: 4.8,
  //     status: 'Active',
  //     color: 'bg-blue-500'
  //   },
  //   {
  //     id: 2,
  //     name: 'Prof. Michael Chen',
  //     subject: 'Physics',
  //     department: 'Science & Math',
  //     email: 'michael.c@school.edu',
  //     phone: '+1 234-567-8902',
  //     avatar: 'MC',
  //     experience: 15,
  //     students: 132,
  //     rating: 4.9,
  //     status: 'Active',
  //     color: 'bg-purple-500'
  //   },
  //   {
  //     id: 3,
  //     name: 'Ms. Emily Rodriguez',
  //     subject: 'English Literature',
  //     department: 'Languages',
  //     email: 'emily.r@school.edu',
  //     phone: '+1 234-567-8903',
  //     avatar: 'ER',
  //     experience: 8,
  //     students: 128,
  //     rating: 4.7,
  //     status: 'Active',
  //     color: 'bg-pink-500'
  //   },
  //   {
  //     id: 4,
  //     name: 'Mr. David Wilson',
  //     subject: 'History',
  //     department: 'Social Studies',
  //     email: 'david.w@school.edu',
  //     phone: '+1 234-567-8904',
  //     avatar: 'DW',
  //     experience: 10,
  //     students: 118,
  //     rating: 4.6,
  //     status: 'Active',
  //     color: 'bg-green-500'
  //   },
  //   {
  //     id: 5,
  //     name: 'Dr. Lisa Anderson',
  //     subject: 'Chemistry',
  //     department: 'Science & Math',
  //     email: 'lisa.a@school.edu',
  //     phone: '+1 234-567-8905',
  //     avatar: 'LA',
  //     experience: 14,
  //     students: 140,
  //     rating: 4.9,
  //     status: 'Active',
  //     color: 'bg-orange-500'
  //   },
  //   {
  //     id: 6,
  //     name: 'Mr. James Brown',
  //     subject: 'Physical Education',
  //     department: 'Sports',
  //     email: 'james.b@school.edu',
  //     phone: '+1 234-567-8906',
  //     avatar: 'JB',
  //     experience: 7,
  //     students: 200,
  //     rating: 4.5,
  //     status: 'On Leave',
  //     color: 'bg-indigo-500'
  //   },
  //   {
  //     id: 7,
  //     name: 'Ms. Maria Garcia',
  //     subject: 'Spanish',
  //     department: 'Languages',
  //     email: 'maria.g@school.edu',
  //     phone: '+1 234-567-8907',
  //     avatar: 'MG',
  //     experience: 9,
  //     students: 95,
  //     rating: 4.8,
  //     status: 'Active',
  //     color: 'bg-red-500'
  //   },
  //   {
  //     id: 8,
  //     name: 'Dr. Robert Taylor',
  //     subject: 'Biology',
  //     department: 'Science & Math',
  //     email: 'robert.t@school.edu',
  //     phone: '+1 234-567-8908',
  //     avatar: 'RT',
  //     experience: 16,
  //     students: 138,
  //     rating: 4.9,
  //     status: 'Active',
  //     color: 'bg-teal-500'
  //   }
  // ];


  private _dialogService = inject(DialogService)
  private _router = inject(Router)
  private _activeRoute = inject(ActivatedRoute)
  private _confirmService = inject(DeleteConfirmDialogService);
  private _cdr = inject(ChangeDetectorRef);
  private _messageService = inject(ToastService)
  private _teachersService = inject(TeachersService)

  ngOnInit(): void {
  }

  upsertTeacher(teacher?: any): void {
    const dialogRef = this._dialogService.open<any>(UpsertTeacherModalComponent, {
      focusOnShow: false,
      dismissableMask: true,
      modal: true,
      header: 'Add new teacher',
      width: '45%',
      data: {
        teacher,
        footer: {
          onConfirm: (formValue: any) => console.log(formValue),
          onCancel: () => dialogRef.close()
        }
      }
    })
  }

  viewProfile(teacher: any): void {
    this._router.navigate([teacher.id], {relativeTo: this._activeRoute})
  }

  deleteTeacher(teacher: any) {
    this._confirmService.confirm((ref: ConfirmationService) => {
      this._confirmService.loading$.next(true)
    })
  }

   acceptDeleteRecord(ref: ConfirmationService): void {
      setTimeout(() => {
        this._confirmService.loading$.next(false);
        ref.close()
      }, 3000)
  }
}
