import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { PageTitleComponent } from "../../shared/components/page-title/page-title.component";
import { Button } from "primeng/button";
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { StudentGridCardComponent } from './components/student-grid-card/student-grid-card.component';
import { SchoolStatsCardComponent } from '../../shared/components/stats-card/stats-card.component';
import { EmptyListComponent } from "../../shared/components/empty-list/empty-list.component";
import { StudentListViewComponent } from './components/student-list-view/student-list-view.component';
import { TextInputComponent } from "../../shared/components/text-input/text-input.component";
import { SelectInputComponent } from "../../shared/components/select-input/select-input.component";
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicModalComponent } from '../../shared/components/dynamic-modal/dynamic-modal.component';

type Student = any

@Component({
  selector: 'school-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss'],
  imports: [PageTitleComponent,
    Button, CommonModule,
    TableModule, TagModule,
    DropdownModule, FormsModule,
    InputTextModule, StudentGridCardComponent,
    SchoolStatsCardComponent, EmptyListComponent,
    StudentListViewComponent, TextInputComponent, SelectInputComponent],
    providers: [DialogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentsComponent implements OnInit {
  students: Student[] = [
    {
      id: 1,
      name: 'Emma Thompson',
      grade: '10th Grade',
      class: '10-A',
      email: 'emma.t@school.edu',
      phone: '+1 234-567-8901',
      avatar: 'ET',
      gpa: 3.8,
      attendance: 95,
      color: 'bg-purple-500'
    },
    {
      id: 2,
      name: 'Liam Chen',
      grade: '11th Grade',
      class: '11-B',
      email: 'liam.c@school.edu',
      phone: '+1 234-567-8902',
      avatar: 'LC',
      gpa: 3.9,
      attendance: 98,
      color: 'bg-blue-500'
    },
    {
      id: 3,
      name: 'Sophia Rodriguez',
      grade: '9th Grade',
      class: '9-C',
      email: 'sophia.r@school.edu',
      phone: '+1 234-567-8903',
      avatar: 'SR',
      gpa: 3.7,
      attendance: 92,
      color: 'bg-pink-500'
    },
    {
      id: 4,
      name: 'Noah Williams',
      grade: '12th Grade',
      class: '12-A',
      email: 'noah.w@school.edu',
      phone: '+1 234-567-8904',
      avatar: 'NW',
      gpa: 4.0,
      attendance: 99,
      color: 'bg-green-500'
    },
    {
      id: 5,
      name: 'Ava Martinez',
      grade: '10th Grade',
      class: '10-B',
      email: 'ava.m@school.edu',
      phone: '+1 234-567-8905',
      avatar: 'AM',
      gpa: 3.6,
      attendance: 94,
      color: 'bg-orange-500'
    },
    {
      id: 6,
      name: 'Oliver Brown',
      grade: '11th Grade',
      class: '11-A',
      email: 'oliver.b@school.edu',
      phone: '+1 234-567-8906',
      avatar: 'OB',
      gpa: 3.85,
      attendance: 96,
      color: 'bg-indigo-500'
    }
  ];


  filteredStudents: Student[] = [];
  searchTerm: string = '';
  selectedGrade: string = 'all';
  viewMode: string = 'grid';

  grades: any[] = [
    { label: 'All Grades', value: 'all' },
    { label: '9th Grade', value: '9th Grade' },
    { label: '10th Grade', value: '10th Grade' },
    { label: '11th Grade', value: '11th Grade' },
    { label: '12th Grade', value: '12th Grade' }
  ];

  totalStudents: number = 0;
  avgAttendance: number = 0;
  avgGPA: number = 0;
  activeClasses: number = 12;

  constructor(private _dialogService: DialogService) {}

  ngOnInit(): void {
    this.filteredStudents = [...this.students];
    this.calculateStats();
  }

  calculateStats(): void {
    this.totalStudents = this.students.length;
    this.avgAttendance = Math.round(
      this.students.reduce((sum, s) => sum + s.attendance, 0) / this.students.length
    );
    this.avgGPA = parseFloat(
      (this.students.reduce((sum, s) => sum + s.gpa, 0) / this.students.length).toFixed(1)
    );
  }

  filterStudents(): void {
    this.filteredStudents = this.students.filter(student => {
      const matchesSearch =
        student.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        student.class.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesGrade =
        this.selectedGrade === 'all' || student.grade === this.selectedGrade;
      return matchesSearch && matchesGrade;
    });
  }

  onSearchChange(value: string): void {
    this.searchTerm = value;
    this.filterStudents();
  }

  onGradeChange(view: string): void {
    this.selectedGrade = view;
    this.filterStudents();
  }

  setViewMode(mode: string): void {
    this.viewMode = mode;
  }

  addStudent(): void {
    this._dialogService.open(DynamicModalComponent, {
       focusOnShow: false,
       dismissableMask: true,
       modal: true,
       header: 'Select a Product',
       width: '50%',
     })
    // Implement add student logic
    console.log('Add student clicked');
  }

  viewProfile(student: Student): void {
    // Implement view profile logic
    console.log('View profile:', student);
  }

}
