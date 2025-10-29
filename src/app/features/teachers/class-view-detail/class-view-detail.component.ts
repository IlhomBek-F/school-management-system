import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ChipModule } from 'primeng/chip';
import { ProgressBarModule } from 'primeng/progressbar';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  attendance: number;
  lastGrade: string;
  status: string;
  initials: string;
}

interface Assignment {
  id: number;
  title: string;
  dueDate: Date;
  submitted: number;
  total: number;
  status: string;
}

interface Announcement {
  id: number;
  title: string;
  message: string;
  date: Date;
  type: string;
}

@Component({
  selector: 'school-class-view-detail',
  imports: [CommonModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    TableModule,
    TagModule,
    AvatarModule,
    AvatarGroupModule,
    ChipModule,
    ProgressBarModule,
    RouterLink,
    DividerModule,
    TooltipModule],
  templateUrl: './class-view-detail.component.html',
  styleUrl: './class-view-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassViewDetailComponent {
  activeTab = 'students';

  tabs = [
    { id: 'overview', label: 'Overview', icon: 'pi pi-home' },
    { id: 'students', label: 'Students', icon: 'pi pi-users' },
    { id: 'schedule', label: 'Schedule', icon: 'pi pi-calendar' },
    { id: 'assignments', label: 'Assignments', icon: 'pi pi-file' },
    { id: 'activity', label: 'Activity', icon: 'pi pi-history' }
  ];

 students: Student[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    rollNumber: 'STU-001',
    attendance: 96,
    lastGrade: 'A',
    status: 'Active',
    initials: 'AJ'
  },
  {
    id: 2,
    name: 'Liam Smith',
    rollNumber: 'STU-002',
    attendance: 89,
    lastGrade: 'B+',
    status: 'Active',
    initials: 'LS'
  },
  {
    id: 3,
    name: 'Sophia Lee',
    rollNumber: 'STU-003',
    attendance: 78,
    lastGrade: 'B',
    status: 'Inactive',
    initials: 'SL'
  },
  {
    id: 4,
    name: 'Noah Patel',
    rollNumber: 'STU-004',
    attendance: 92,
    lastGrade: 'A-',
    status: 'Active',
    initials: 'NP'
  },
  {
    id: 5,
    name: 'Emma Davis',
    rollNumber: 'STU-005',
    attendance: 85,
    lastGrade: 'B',
    status: 'Active',
    initials: 'ED'
  },
  {
    id: 6,
    name: 'James Wilson',
    rollNumber: 'STU-006',
    attendance: 99,
    lastGrade: 'A+',
    status: 'Active',
    initials: 'JW'
  },
  {
    id: 7,
    name: 'Olivia Martinez',
    rollNumber: 'STU-007',
    attendance: 73,
    lastGrade: 'C+',
    status: 'Inactive',
    initials: 'OM'
  },
  {
    id: 8,
    name: 'Ethan Brown',
    rollNumber: 'STU-008',
    attendance: 91,
    lastGrade: 'A',
    status: 'Active',
    initials: 'EB'
  },
  {
    id: 9,
    name: 'Ava Thompson',
    rollNumber: 'STU-009',
    attendance: 88,
    lastGrade: 'B+',
    status: 'Active',
    initials: 'AT'
  },
  {
    id: 10,
    name: 'William Chen',
    rollNumber: 'STU-010',
    attendance: 82,
    lastGrade: 'B',
    status: 'Active',
    initials: 'WC'
  }
];


 assignments: Assignment[] = [
  {
    id: 1,
    title: 'Algebra Worksheet 1',
    dueDate: new Date('2025-11-05'),
    submitted: 8,
    total: 10,
    status: 'Ongoing'
  },
  {
    id: 2,
    title: 'Calculus Quiz',
    dueDate: new Date('2025-10-27'),
    submitted: 10,
    total: 10,
    status: 'Completed'
  },
  {
    id: 3,
    title: 'Trigonometry Project',
    dueDate: new Date('2025-11-10'),
    submitted: 6,
    total: 10,
    status: 'Pending'
  },
  {
    id: 4,
    title: 'Statistics Homework',
    dueDate: new Date('2025-11-01'),
    submitted: 9,
    total: 10,
    status: 'Ongoing'
  },
  {
    id: 5,
    title: 'Final Exam Review',
    dueDate: new Date('2025-11-15'),
    submitted: 0,
    total: 10,
    status: 'Upcoming'
  }
];



  announcements: Announcement[] = [
  {
    id: 1,
    title: 'Exam Schedule Released',
    message: 'The midterm exam schedule has been uploaded to the portal.',
    date: new Date('2025-10-25'),
    type: 'Info'
  },
  {
    id: 2,
    title: 'Project Submission Reminder',
    message: 'Don’t forget to submit your Trigonometry project before Nov 10th.',
    date: new Date('2025-10-28'),
    type: 'Warning'
  },
  {
    id: 3,
    title: 'Class Canceled',
    message: 'Friday’s class is canceled due to the school’s annual sports event.',
    date: new Date('2025-10-30'),
    type: 'Alert'
  },
  {
    id: 4,
    title: 'New Material Uploaded',
    message: 'New practice worksheets have been added for Algebra topic 3.',
    date: new Date('2025-10-29'),
    type: 'Update'
  },
  {
    id: 5,
    title: 'Parent-Teacher Meeting',
    message: 'A parent-teacher meeting is scheduled for Nov 20th at 10:00 AM.',
    date: new Date('2025-11-02'),
    type: 'Info'
  }
];

private _activeRoute = inject(ActivatedRoute)
private _router = inject(Router)

  ngOnInit() {
    this.activeTab = 'students';
    const queryPa = this._activeRoute.snapshot.paramMap.get('teacher_id')
    console.log(queryPa)
  }

  backToTeacherDetailPage() {
    const teacher_id = this._activeRoute.snapshot.paramMap.get('teacher_id')
    this._router.navigate([`/teachers/${teacher_id}`])
  }

  getRandomColor(): string {
    const colors = ['#3B82F6', '#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#06B6D4'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  getPerformanceClass(performance: string): string {
    switch (performance) {
      case 'Excellent': return 'bg-green-100 text-green-700';
      case 'Good': return 'bg-blue-100 text-blue-700';
      case 'Average': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Active': return 'bg-blue-100 text-blue-700';
      case 'Completed': return 'bg-green-100 text-green-700';
      case 'Overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  }
}
