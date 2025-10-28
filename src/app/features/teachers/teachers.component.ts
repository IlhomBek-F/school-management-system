import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { PageTitleComponent } from "../../shared/components/page-title/page-title.component";
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { DropdownModule } from "primeng/dropdown";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SchoolStatsCardComponent } from "../../shared/components/stats-card/stats-card.component";
import { EmptyListComponent } from "../../shared/components/empty-list/empty-list.component";
import { TextInputComponent } from "../../shared/components/text-input/text-input.component";
import { SelectInputComponent } from "../../shared/components/select-input/select-input.component";
import { TeacherViewListComponent } from './components/teacher-view-list/teacher-view-list.component';
import { TeacherGridCardComponent } from './components/teacher-grid-card/teacher-grid-card.component';

@Component({
  selector: 'school-teachers',
  imports: [PageTitleComponent, TagModule,
            ButtonModule, TableModule,
            DropdownModule, CommonModule,
            FormsModule, SchoolStatsCardComponent,
            EmptyListComponent, TextInputComponent, SelectInputComponent, TeacherViewListComponent, TeacherGridCardComponent],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeachersComponent implements OnInit {
 teachers: any[] = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      subject: 'Mathematics',
      department: 'Science & Math',
      email: 'sarah.j@school.edu',
      phone: '+1 234-567-8901',
      avatar: 'SJ',
      experience: 12,
      students: 145,
      rating: 4.8,
      status: 'Active',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Prof. Michael Chen',
      subject: 'Physics',
      department: 'Science & Math',
      email: 'michael.c@school.edu',
      phone: '+1 234-567-8902',
      avatar: 'MC',
      experience: 15,
      students: 132,
      rating: 4.9,
      status: 'Active',
      color: 'bg-purple-500'
    },
    {
      id: 3,
      name: 'Ms. Emily Rodriguez',
      subject: 'English Literature',
      department: 'Languages',
      email: 'emily.r@school.edu',
      phone: '+1 234-567-8903',
      avatar: 'ER',
      experience: 8,
      students: 128,
      rating: 4.7,
      status: 'Active',
      color: 'bg-pink-500'
    },
    {
      id: 4,
      name: 'Mr. David Wilson',
      subject: 'History',
      department: 'Social Studies',
      email: 'david.w@school.edu',
      phone: '+1 234-567-8904',
      avatar: 'DW',
      experience: 10,
      students: 118,
      rating: 4.6,
      status: 'Active',
      color: 'bg-green-500'
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      subject: 'Chemistry',
      department: 'Science & Math',
      email: 'lisa.a@school.edu',
      phone: '+1 234-567-8905',
      avatar: 'LA',
      experience: 14,
      students: 140,
      rating: 4.9,
      status: 'Active',
      color: 'bg-orange-500'
    },
    {
      id: 6,
      name: 'Mr. James Brown',
      subject: 'Physical Education',
      department: 'Sports',
      email: 'james.b@school.edu',
      phone: '+1 234-567-8906',
      avatar: 'JB',
      experience: 7,
      students: 200,
      rating: 4.5,
      status: 'On Leave',
      color: 'bg-indigo-500'
    },
    {
      id: 7,
      name: 'Ms. Maria Garcia',
      subject: 'Spanish',
      department: 'Languages',
      email: 'maria.g@school.edu',
      phone: '+1 234-567-8907',
      avatar: 'MG',
      experience: 9,
      students: 95,
      rating: 4.8,
      status: 'Active',
      color: 'bg-red-500'
    },
    {
      id: 8,
      name: 'Dr. Robert Taylor',
      subject: 'Biology',
      department: 'Science & Math',
      email: 'robert.t@school.edu',
      phone: '+1 234-567-8908',
      avatar: 'RT',
      experience: 16,
      students: 138,
      rating: 4.9,
      status: 'Active',
      color: 'bg-teal-500'
    }
  ];

  filteredTeachers: any[] = [];
  searchTerm: string = '';
  selectedDepartment: string = 'all';
  viewMode: string = 'grid';

  departments: any[] = [
    { label: 'All Departments', value: 'all' },
    { label: 'Science & Math', value: 'Science & Math' },
    { label: 'Languages', value: 'Languages' },
    { label: 'Social Studies', value: 'Social Studies' },
    { label: 'Sports', value: 'Sports' }
  ];

  totalTeachers: number = 0;
  avgExperience: number = 0;
  totalStudents: number = 0;
  avgRating: number = 0;

  ngOnInit(): void {
    this.filteredTeachers = [...this.teachers];
    this.calculateStats();
  }

  calculateStats(): void {
    this.totalTeachers = this.teachers.length;
    this.avgExperience = Math.round(
      this.teachers.reduce((sum, t) => sum + t.experience, 0) / this.teachers.length
    );
    this.totalStudents = this.teachers.reduce((sum, t) => sum + t.students, 0);
    this.avgRating = parseFloat(
      (this.teachers.reduce((sum, t) => sum + t.rating, 0) / this.teachers.length).toFixed(1)
    );
  }

  filterTeachers(): void {
    this.filteredTeachers = this.teachers.filter(teacher => {
      const matchesSearch =
        teacher.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDepartment =
        this.selectedDepartment === 'all' || teacher.department === this.selectedDepartment;
      return matchesSearch && matchesDepartment;
    });
  }

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.filterTeachers();
  }

  onDepartmentChange(department: string): void {
    this.selectedDepartment = department
    this.filterTeachers();
  }

  setViewMode(mode: string): void {
    this.viewMode = mode;
  }

  addTeacher(): void {
    console.log('Add teacher clicked');
  }

  viewProfile(teacher: any): void {
    console.log('View profile:', teacher);
  }

  getStatusSeverity(status: string): string {
    return status === 'Active' ? 'success' : 'warning';
  }


}
