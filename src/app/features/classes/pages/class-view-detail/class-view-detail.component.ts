import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { ActivatedRoute, Router } from '@angular/router';
import { OverviewComponent } from '@components/tabs/overview/overview.component';
import { StudentsComponent } from '@components/tabs/students/students.component';
import { AssignmentsComponent } from '@components/tabs/assignments/assignments.component';
import { ResourcesComponent } from '@components/tabs/resources/resources.component';
import { ClassViewDetailHeaderComponent } from '@components/view-detail/header/header.component';

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
    BadgeModule,
    DividerModule,
    TooltipModule, OverviewComponent, StudentsComponent, AssignmentsComponent, ResourcesComponent, ClassViewDetailHeaderComponent],
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

   classData = {
    title: "Advanced Web Development",
    code: "CS401",
    instructor: "Dr. Sarah Johnson",
    term: "Fall 2024",
    schedule: "Mon, Wed, Fri - 10:00 AM - 11:30 AM",
    location: "Room 302, Engineering Building",
    credits: 3,
    capacity: 30,
    enrolled: 27,
    description: "This course covers advanced topics in web development including modern frameworks, responsive design, API integration, and deployment strategies. Students will build full-stack applications using industry-standard tools and best practices.",
    tags: ["Web Development", "Full Stack", "JavaScript", "React"]
  };
  activeIndex: number = 0;

   resources: any[] = [
    { name: "Course Syllabus", type: "PDF", size: "2.4 MB", icon: "pi-file-pdf", color: "text-red-600" },
    { name: "Lecture Slides - Week 1", type: "PPTX", size: "15.2 MB", icon: "pi-file", color: "text-orange-600" },
    { name: "Reading List", type: "DOCX", size: "1.1 MB", icon: "pi-file-word", color: "text-blue-600" },
    { name: "Code Examples Repository", type: "Link", size: "-", icon: "pi-link", color: "text-purple-600" }
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

 schedule: any[] = [
    { week: 1, topic: "Introduction & Course Overview", date: "Sep 4" },
    { week: 2, topic: "Modern JavaScript & ES6+", date: "Sep 11" },
    { week: 3, topic: "React Fundamentals", date: "Sep 18" },
    { week: 4, topic: "State Management", date: "Sep 25" },
    { week: 5, topic: "API Integration & Fetch", date: "Oct 2" },
    { week: 6, topic: "Backend Development with Node.js", date: "Oct 9" }
  ];
enrollmentPercentage!: number;
loading = signal(true)

private _activeRoute = inject(ActivatedRoute)
private _router = inject(Router)

  ngOnInit() {
    this.activeTab = 'students';
    setTimeout(() => this.loading.set(false), 3000)
    this.enrollmentPercentage = (this.classData.enrolled / this.classData.capacity) * 100;
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





  onEditClass(): void {
    console.log('Edit class clicked');
  }

  onEnrollStudent(): void {
    console.log('Enroll student clicked');
  }


}
