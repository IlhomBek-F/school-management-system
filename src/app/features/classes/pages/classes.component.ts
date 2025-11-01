import { ChangeDetectionStrategy, Component, inject, signal, type OnInit } from '@angular/core';
import { PageTitleComponent } from "@shared/components/page-title/page-title.component";
import { DropdownModule } from "primeng/dropdown";
import { Button } from "primeng/button";
import { TableModule } from "primeng/table";
import { FormsModule } from '@angular/forms';
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

interface Class {
  id: number;
  name: string;
  code: string;
  subject: string;
  teacher: string;
  grade: string;
  schedule: string;
  room: string;
  students: number;
  capacity: number;
  duration: string;
  startDate: string;
  endDate: string;
  status: string;
  color: string;
  description: string
}

@Component({
  selector: 'school-classes.component',
  imports: [PageTitleComponent, DropdownModule, Button,
    TableModule, FormsModule, CommonModule, SchoolStatsCardComponent,
    ClassesGridViewListComponent, TextInputComponent, SelectInputComponent, ClassesTableViewListComponent, EmptyListComponent],
  templateUrl: './classes.component.html',
  styleUrl: './classes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ClassesComponent implements OnInit {
  loading = signal(true)

  classes: Class[] = [
    {
      id: 1,
      name: 'Advanced Mathematics',
      code: 'MATH-401',
      subject: 'Mathematics',
      teacher: 'Dr. Sarah Johnson',
      grade: '12th Grade',
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      room: 'Room 201',
      students: 28,
      capacity: 30,
      duration: '50 min',
      startDate: '2024-09-01',
      endDate: '2025-05-30',
      status: 'Active',
      color: 'bg-blue-500',
      description: 'test class'
    },
    {
      id: 2,
      name: 'Physics Lab',
      code: 'PHY-301',
      subject: 'Physics',
      teacher: 'Prof. Michael Chen',
      grade: '11th Grade',
      schedule: 'Tue, Thu - 10:30 AM',
      room: 'Lab 3',
      students: 24,
      capacity: 25,
      duration: '90 min',
      startDate: '2024-09-01',
      endDate: '2025-05-30',
      status: 'Active',
      color: 'bg-purple-500',
      description: 'test class'
    },
    {
      id: 3,
      name: 'English Literature',
      code: 'ENG-201',
      subject: 'English',
      teacher: 'Ms. Emily Rodriguez',
      grade: '10th Grade',
      schedule: 'Mon, Wed, Fri - 11:00 AM',
      room: 'Room 105',
      students: 30,
      capacity: 30,
      duration: '45 min',
      startDate: '2024-09-01',
      endDate: '2025-05-30',
      status: 'Active',
      color: 'bg-pink-500',
      description: 'test class'
    },
    {
      id: 4,
      name: 'World History',
      code: 'HIST-301',
      subject: 'History',
      teacher: 'Mr. David Wilson',
      grade: '11th Grade',
      schedule: 'Tue, Thu - 1:00 PM',
      room: 'Room 108',
      students: 25,
      capacity: 28,
      duration: '50 min',
      startDate: '2024-09-01',
      endDate: '2025-05-30',
      status: 'Active',
      color: 'bg-green-500',
      description: 'test class'
    },
    {
      id: 5,
      name: 'Chemistry Fundamentals',
      code: 'CHEM-201',
      subject: 'Chemistry',
      teacher: 'Dr. Lisa Anderson',
      grade: '10th Grade',
      schedule: 'Mon, Wed - 2:00 PM',
      room: 'Lab 1',
      students: 22,
      capacity: 26,
      duration: '60 min',
      startDate: '2024-09-01',
      endDate: '2025-05-30',
      status: 'Active',
      color: 'bg-orange-500',
      description: 'test class'
    },
    {
      id: 6,
      name: 'Physical Education',
      code: 'PE-101',
      subject: 'Sports',
      teacher: 'Mr. James Brown',
      grade: '9th Grade',
      schedule: 'Daily - 3:30 PM',
      room: 'Gymnasium',
      students: 45,
      capacity: 50,
      duration: '45 min',
      startDate: '2024-09-01',
      endDate: '2025-05-30',
      status: 'Cancelled',
      color: 'bg-indigo-500',
      description: 'test class'
    },
    {
      id: 7,
      name: 'Spanish Language',
      code: 'SPAN-201',
      subject: 'Spanish',
      teacher: 'Ms. Maria Garcia',
      grade: '10th Grade',
      schedule: 'Tue, Thu - 8:30 AM',
      room: 'Room 210',
      students: 20,
      capacity: 25,
      duration: '50 min',
      startDate: '2024-09-01',
      endDate: '2025-05-30',
      status: 'Active',
      color: 'bg-red-500',
      description: 'test class'
    },
    {
      id: 8,
      name: 'Biology Advanced',
      code: 'BIO-401',
      subject: 'Biology',
      teacher: 'Dr. Robert Taylor',
      grade: '12th Grade',
      schedule: 'Mon, Wed, Fri - 1:30 PM',
      room: 'Lab 2',
      students: 26,
      capacity: 28,
      duration: '55 min',
      startDate: '2024-09-01',
      endDate: '2025-05-30',
      status: 'Active',
      color: 'bg-teal-500',
      description: 'test class'
    }
  ];

  filteredClasses: Class[] = [];
  searchTerm: string = '';
  selectedGrade: string = 'all';
  selectedStatus: string = 'all';
  viewMode: string = 'grid';

  grades: any[] = [
    { label: 'All Grades', value: 'all' },
    { label: '9th Grade', value: '9th Grade' },
    { label: '10th Grade', value: '10th Grade' },
    { label: '11th Grade', value: '11th Grade' },
    { label: '12th Grade', value: '12th Grade' }
  ];

  statuses: any[] = [
    { label: 'All Status', value: 'all' },
    { label: 'Active', value: 'Active' },
    { label: 'Cancelled', value: 'Cancelled' }
  ];

  totalClasses: number = 0;
  activeClasses: number = 0;
  totalStudents: number = 0;
  avgCapacity: number = 0;

  private _dialogService = inject(DialogService)
  private _router = inject(Router)
  private _activeRoute = inject(ActivatedRoute)
  private _confirmService = inject(DeleteConfirmDialogService)
  private _messageService = inject(ToastService)

  ngOnInit(): void {
    setTimeout(() => this.loading.set(false), 3000)
    this.filteredClasses = [...this.classes];
    this.calculateStats();
  }

  calculateStats(): void {
    this.totalClasses = this.classes.length;
    this.activeClasses = this.classes.filter(c => c.status === 'Active').length;
    this.totalStudents = this.classes.reduce((sum, c) => sum + c.students, 0);
    this.avgCapacity = Math.round(
      (this.classes.reduce((sum, c) => sum + (c.students / c.capacity * 100), 0) / this.classes.length)
    );
  }

  filterClasses(): void {
    this.filteredClasses = this.classes.filter(cls => {
      const matchesSearch =
        cls.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cls.code.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        cls.teacher.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesGrade =
        this.selectedGrade === 'all' || cls.grade === this.selectedGrade;
      const matchesStatus =
        this.selectedStatus === 'all' || cls.status === this.selectedStatus;
      return matchesSearch && matchesGrade && matchesStatus;
    });
  }

  onSearchChange(term: string): void {
    this.searchTerm = term
    this.filterClasses();
  }

  onGradeChange(grade: string): void {
    this.selectedGrade = grade;
    this.filterClasses();
  }

  onStatusChange(): void {
    this.filterClasses();
  }

  setViewMode(mode: string): void {
    this.viewMode = mode;
  }

  upsertClass(classObj?: Class): void {
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

  viewDetails(cls: Class): void {
   this._router.navigate([cls.id], {relativeTo: this._activeRoute})
  }

  deleteClass(classObj: any) {
        this._confirmService.confirm((ref: ConfirmationService) => {
          this._confirmService.loading$.next(true)
          setTimeout(() => {
            this._confirmService.loading$.next(false);
            this.filteredClasses = this.filteredClasses.filter(({id}) => classObj.id !== id)
            this._messageService.success("Class deleted successfully")
            ref.close()
          }, 3000)
        })
      }

  getStatusSeverity(status: string): string {
    switch(status) {
      case 'Active': return 'success';
      case 'Cancelled': return 'danger';
      default: return 'info';
    }
  }

  getCapacityPercentage(students: number, capacity: number): number {
    return Math.round((students / capacity) * 100);
  }

  getCapacitySeverity(percentage: number): string {
    if (percentage >= 90) return 'danger';
    if (percentage >= 70) return 'warning';
    return 'success';
  }
}
