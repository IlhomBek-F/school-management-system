import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TagModule } from "primeng/tag";
import { ChartModule } from "primeng/chart";
import { ButtonModule } from "primeng/button";
import { CommonModule } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { OverviewComponent } from '../../components/overview/overview.component';
import { ClassesComponent } from '../../components/classes/classes.component';
import { ScheduleComponent } from '../../components/schedule/schedule.component';
import { StudentsComponent } from '../../components/students/students.component';
import { ActivityComponent } from '../../components/activity/activity.component';
import { UpsertTeacherModalComponent } from '../../components/upsert-teacher-modal/upsert-teacher-modal.component';
import { TabViewModule } from "primeng/tabview";
import { TeacherViewDetailHeaderComponent } from "../../components/teacher-view-detail-header/teacher-view-detail-header.component";

interface Teacher {
  id: number;
  first_name: string;
  last_name: string;
  teacher_id: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  address: string;
  city: string;
  country: string;
  department: string;
  subjects: string[];
  qualification: string;
  experience: number;
  joining_date: string;
  employment_type: string;
  salary: number;
  rating: number;
  total_students: number;
  total_classes: number;
  status: string;
  avatar: string;
  color: string;
}

interface Class {
  id: number;
  name: string;
  code: string;
  grade: string;
  students: number;
  schedule: string;
  room: string;
  color: string;
}

interface Student {
  id: number;
  name: string;
  grade: string;
  class: string;
  gpa: number;
  avatar: string;
  color: string;
}

interface Schedule {
  day: string;
  classes: {
    time: string;
    subject: string;
    class: string;
    room: string;
  }[];
}

interface ActivityLog {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  type: string;
  icon: string;
  color: string;
}

@Component({
  selector: 'school-teacher-view-detail',
  imports: [TagModule, ChartModule, ButtonModule, CommonModule, OverviewComponent, ClassesComponent, ScheduleComponent, StudentsComponent, ActivityComponent, TabViewModule, TeacherViewDetailHeaderComponent],
  templateUrl: './teacher-view-detail.component.html',
  styleUrl: './teacher-view-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TeacherViewDetailComponent {
  activeIndex = 0;
  loading = signal(true)

  tabItems = [
    {
      title: 'Overview',
      value: 'overview',
      icon: 'pi pi-home'
    },
    {
      title: 'Classes',
      value: 'classes',
      icon: 'pi pi-book'
    },
    {
      title: 'Schedule',
      value: 'schedule',
      icon: 'pi pi-calendar'
    },
    {
      title: 'Students',
      value: 'students',
      icon: 'pi pi-users'
    },
    {
      title: 'Activity',
      value: 'activity',
      icon: 'pi pi-history'
    },
  ];

  teacher: Teacher = {
    id: 1,
    first_name: 'Sarah',
    last_name: 'Johnson',
    teacher_id: 'TCH-2024-001',
    email: 'sarah.johnson@school.edu',
    phone: '+1 234-567-8901',
    date_of_birth: '1985-03-15',
    gender: 'Female',
    address: '456 Education Avenue, Suite 12',
    city: 'New York',
    country: 'United States',
    department: 'Science & Math',
    subjects: ['Mathematics', 'Statistics', 'Calculus'],
    qualification: 'PhD in Mathematics',
    experience: 12,
    joining_date: '2012-09-01',
    employment_type: 'Full-Time',
    salary: 75000,
    rating: 4.8,
    total_students: 145,
    total_classes: 6,
    status: 'Active',
    avatar: 'SJ',
    color: 'bg-blue-500'
  };

  classes: Class[] = [
    {
      id: 1,
      name: 'Advanced Mathematics',
      code: 'MATH-401',
      grade: '12th Grade',
      students: 28,
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      room: 'Room 201',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Calculus I',
      code: 'MATH-301',
      grade: '11th Grade',
      students: 25,
      schedule: 'Tue, Thu - 10:30 AM',
      room: 'Room 201',
      color: 'bg-purple-500'
    },
    {
      id: 3,
      name: 'Statistics',
      code: 'MATH-201',
      grade: '10th Grade',
      students: 30,
      schedule: 'Mon, Wed, Fri - 11:00 AM',
      room: 'Room 203',
      color: 'bg-green-500'
    },
    {
      id: 4,
      name: 'Algebra II',
      code: 'MATH-202',
      grade: '10th Grade',
      students: 27,
      schedule: 'Tue, Thu - 1:00 PM',
      room: 'Room 201',
      color: 'bg-orange-500'
    },
    {
      id: 5,
      name: 'Geometry',
      code: 'MATH-101',
      grade: '9th Grade',
      students: 32,
      schedule: 'Mon, Wed, Fri - 2:00 PM',
      room: 'Room 204',
      color: 'bg-pink-500'
    },
    {
      id: 6,
      name: 'Math Lab',
      code: 'MATH-LAB',
      grade: 'All Grades',
      students: 3,
      schedule: 'Fri - 3:00 PM',
      room: 'Lab 5',
      color: 'bg-indigo-500'
    }
  ];

  topStudents: Student[] = [
    {
      id: 1,
      name: 'Emma Thompson',
      grade: '10th Grade',
      class: '10-A',
      gpa: 4.0,
      avatar: 'ET',
      color: 'bg-purple-500'
    },
    {
      id: 2,
      name: 'Noah Williams',
      grade: '12th Grade',
      class: '12-A',
      gpa: 3.9,
      avatar: 'NW',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      name: 'Liam Chen',
      grade: '11th Grade',
      class: '11-B',
      gpa: 3.85,
      avatar: 'LC',
      color: 'bg-green-500'
    }
  ];

  weekSchedule: Schedule[] = [
    {
      day: 'Monday',
      classes: [
        { time: '9:00 AM - 9:50 AM', subject: 'Advanced Math', class: '12-A', room: 'Room 201' },
        { time: '11:00 AM - 11:50 AM', subject: 'Statistics', class: '10-A', room: 'Room 203' },
        { time: '2:00 PM - 2:50 PM', subject: 'Geometry', class: '9-B', room: 'Room 204' }
      ]
    },
    {
      day: 'Tuesday',
      classes: [
        { time: '10:30 AM - 11:20 AM', subject: 'Calculus I', class: '11-A', room: 'Room 201' },
        { time: '1:00 PM - 1:50 PM', subject: 'Algebra II', class: '10-C', room: 'Room 201' }
      ]
    },
    {
      day: 'Wednesday',
      classes: [
        { time: '9:00 AM - 9:50 AM', subject: 'Advanced Math', class: '12-A', room: 'Room 201' },
        { time: '11:00 AM - 11:50 AM', subject: 'Statistics', class: '10-A', room: 'Room 203' },
        { time: '2:00 PM - 2:50 PM', subject: 'Geometry', class: '9-B', room: 'Room 204' }
      ]
    },
    {
      day: 'Thursday',
      classes: [
        { time: '10:30 AM - 11:20 AM', subject: 'Calculus I', class: '11-A', room: 'Room 201' },
        { time: '1:00 PM - 1:50 PM', subject: 'Algebra II', class: '10-C', room: 'Room 201' }
      ]
    },
    {
      day: 'Friday',
      classes: [
        { time: '9:00 AM - 9:50 AM', subject: 'Advanced Math', class: '12-A', room: 'Room 201' },
        { time: '11:00 AM - 11:50 AM', subject: 'Statistics', class: '10-A', room: 'Room 203' },
        { time: '2:00 PM - 2:50 PM', subject: 'Geometry', class: '9-B', room: 'Room 204' },
        { time: '3:00 PM - 4:00 PM', subject: 'Math Lab', class: 'Open', room: 'Lab 5' }
      ]
    }
  ];

  activityLogs: ActivityLog[] = [
    {
      id: 1,
      title: 'Exam Grades Posted',
      description: 'Posted grades for Advanced Mathematics Mid-term',
      date: '2024-11-01',
      time: '2:30 PM',
      type: 'academic',
      icon: 'pi-check-circle',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 2,
      title: 'Material Uploaded',
      description: 'Uploaded study material for Calculus I',
      date: '2024-10-31',
      time: '10:15 AM',
      type: 'content',
      icon: 'pi-upload',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 3,
      title: 'Class Rescheduled',
      description: 'Statistics class moved to Room 205',
      date: '2024-10-30',
      time: '8:45 AM',
      type: 'schedule',
      icon: 'pi-calendar',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 4,
      title: 'Meeting Attended',
      description: 'Department meeting - Curriculum planning',
      date: '2024-10-28',
      time: '3:00 PM',
      type: 'meeting',
      icon: 'pi-users',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  // Chart Data
  performanceChartData: any;
  performanceChartOptions: any;

  studentProgressChartData: any;
  studentProgressChartOptions: any;

  private _dialogService = inject(DialogService)

  ngOnInit(): void {
    setTimeout(() => this.loading.set(false), 3000)
    this.initializeCharts();
  }

  initializeCharts(): void {
    // Performance Chart
    this.performanceChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Average Class Performance',
          data: [85, 87, 88, 90, 89, 92],
          fill: true,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          tension: 0.4
        }
      ]
    };

    this.performanceChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          min: 80,
          max: 100
        }
      }
    };

    // Student Progress Chart
    this.studentProgressChartData = {
      labels: ['Excellent', 'Good', 'Average', 'Below Average', 'Poor'],
      datasets: [
        {
          data: [45, 30, 15, 8, 2],
          backgroundColor: [
            '#10b981',
            '#3b82f6',
            '#f59e0b',
            '#ef4444',
            '#6b7280'
          ]
        }
      ]
    };

    this.studentProgressChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    };
  }
}
