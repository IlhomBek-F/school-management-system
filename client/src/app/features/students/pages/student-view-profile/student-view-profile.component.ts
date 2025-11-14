import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { TagModule } from "primeng/tag";
import { ChartModule } from "primeng/chart";
import { ButtonModule } from "primeng/button";
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { OverviewComponent } from '../../components/tabs/overview/overview.component';
import { SubjectsComponent } from '../../components/tabs/subjects/subjects.component';
import { AttendanceComponent } from '../../components/tabs/attendance/attendance.component';
import { ActivityComponent } from '../../components/tabs/activity/activity.component';
import { StudentViewDetailHeaderComponent } from "../../components/view-detail/student-view-detail-header/student-view-detail-header.component";
import { TabViewModule } from "primeng/tabview";
import { BreadcrumbComponent } from "@shared/components/breadcrumb/breadcrumb.component";
import { finalize } from 'rxjs';
import { untilDestroyed } from '@ngneat/until-destroy';

interface Student {
  id: number;
  first_name: string;
  last_name: string;
  student_id: string;
  email: string;
  phone: string;
  date_of_birth: string;
  gender: string;
  blood_group: string;
  address: string;
  city: string;
  grade: string;
  class: string;
  admission_date: string;
  previous_school: string;
  gpa: number;
  attendance: number;
  status: string;
  avatar: string;
  color: string;
}

interface Subject {
  id: number;
  name: string;
  teacher: string;
  grade: string;
  attendance: number;
  color: string;
}

interface AttendanceRecord {
  date: string;
  status: string;
  remarks: string;
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
  selector: 'school-student-view-profile',
  imports: [TagModule, ChartModule, ButtonModule, CommonModule, OverviewComponent, SubjectsComponent, AttendanceComponent, ActivityComponent, StudentViewDetailHeaderComponent, TabViewModule, BreadcrumbComponent],
  templateUrl: './student-view-profile.component.html',
  styleUrl: './student-view-profile.component.scss',
  providers: [DialogService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentViewProfileComponent {
  activeIndex: number = 0;
  loading = signal(true)

  tabItems = [
    {
      title: 'Overview',
      value: 'overview',
      icon: 'pi pi-home'
    },
    {
      title: 'Subjects',
      value: 'subjects',
      icon: 'pi pi-book'
    },
    {
      title: 'Attendance',
      value: 'attendance',
      icon: 'pi pi-calendar'
    },
    {
      title: 'Activity',
      value: 'activity',
      icon: 'pi pi-history'
    },
  ];

  student: Student = {
    id: 1,
    first_name: 'Emma',
    last_name: 'Thompson',
    student_id: 'STU-2024-001',
    email: 'emma.thompson@school.edu',
    phone: '+1 234-567-8901',
    date_of_birth: '2007-05-15',
    gender: 'Female',
    blood_group: 'A+',
    address: '123 Main Street, Apartment 4B',
    city: 'New York',
    grade: '10th Grade',
    class: '10-A',
    admission_date: '2020-09-01',
    previous_school: 'Central Middle School',
    gpa: 3.8,
    attendance: 95,
    status: 'Active',
    avatar: 'ET',
    color: 'bg-purple-500'
  };

  subjects: Subject[] = [
    {
      id: 1,
      name: 'Mathematics',
      teacher: 'Dr. Sarah Johnson',
      grade: 'A',
      attendance: 98,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Physics',
      teacher: 'Prof. Michael Chen',
      grade: 'A-',
      attendance: 96,
      color: 'bg-purple-500'
    },
    {
      id: 3,
      name: 'English',
      teacher: 'Ms. Emily Rodriguez',
      grade: 'B+',
      attendance: 94,
      color: 'bg-pink-500'
    },
    {
      id: 4,
      name: 'Chemistry',
      teacher: 'Dr. Lisa Anderson',
      grade: 'A',
      attendance: 97,
      color: 'bg-green-500'
    },
    {
      id: 5,
      name: 'History',
      teacher: 'Mr. David Wilson',
      grade: 'B',
      attendance: 92,
      color: 'bg-orange-500'
    }
  ];

  recentAttendance: AttendanceRecord[] = [
    { date: '2024-11-01', status: 'Present', remarks: 'On time' },
    { date: '2024-10-31', status: 'Present', remarks: 'On time' },
    { date: '2024-10-30', status: 'Present', remarks: 'On time' },
    { date: '2024-10-29', status: 'Absent', remarks: 'Sick leave' },
    { date: '2024-10-28', status: 'Present', remarks: 'On time' },
    { date: '2024-10-27', status: 'Present', remarks: 'Late arrival' },
    { date: '2024-10-26', status: 'Present', remarks: 'On time' }
  ];

  activityLogs: ActivityLog[] = [
    {
      id: 1,
      title: 'Assignment Submitted',
      description: 'Submitted Mathematics Assignment #5',
      date: '2024-11-01',
      time: '10:30 AM',
      type: 'academic',
      icon: 'pi-file-check',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      title: 'Exam Completed',
      description: 'Mid-term Physics Exam',
      date: '2024-10-30',
      time: '2:00 PM',
      type: 'exam',
      icon: 'pi-pencil',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 3,
      title: 'Library Book Borrowed',
      description: 'To Kill a Mockingbird',
      date: '2024-10-28',
      time: '11:15 AM',
      type: 'library',
      icon: 'pi-book',
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 4,
      title: 'Award Received',
      description: 'Perfect Attendance Award',
      date: '2024-10-25',
      time: '9:00 AM',
      type: 'achievement',
      icon: 'pi-trophy',
      color: 'bg-amber-100 text-amber-600'
    }
  ];

  // Chart Data
  performanceChartData: any;
  performanceChartOptions: any;

  attendanceChartData: any;
  attendanceChartOptions: any;

  ngOnInit(): void {
    setTimeout(() => this.loading.set(false), 4000)
    this.initializeCharts();
  }

  initializeCharts(): void {
    // Performance Chart
    this.performanceChartData = {
      labels: ['Math', 'Physics', 'English', 'Chemistry', 'History'],
      datasets: [
        {
          label: 'Current Grades',
          data: [95, 92, 85, 94, 82],
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
          borderColor: '#6366f1',
          pointBackgroundColor: '#6366f1',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: '#6366f1'
        }
      ]
    };

    this.performanceChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    };

    // Attendance Chart
    this.attendanceChartData = {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Attendance %',
          data: [100, 95, 90, 95],
          backgroundColor: '#10b981',
          borderRadius: 8
        }
      ]
    };

    this.attendanceChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    };
  }

  getAttendanceStatusColor(status: string): string {
    switch (status) {
      case 'Present': return 'text-green-600 bg-green-50';
      case 'Absent': return 'text-red-600 bg-red-50';
      case 'Late': return 'text-orange-600 bg-orange-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  }
}
