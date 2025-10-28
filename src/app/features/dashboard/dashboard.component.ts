import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { PageTitleComponent } from "../../shared/components/page-title/page-title.component";
import { TagModule } from "primeng/tag";
import { ButtonModule } from "primeng/button";
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TopStudentsComponent } from "./components/top-students/top-students.component";
import { UpcomingEventsComponent } from './components/upcoming-events/upcoming-events.component';

interface TopStudent {
  id: number;
  name: string;
  grade: string;
  gpa: number;
  avatar: string;
  color: string;
}

@Component({
  selector: 'school-dashboard',
  imports: [PageTitleComponent, TagModule, ButtonModule, CommonModule, ChartModule, TopStudentsComponent, UpcomingEventsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {

   statCards: any[] = [
    {
      title: 'Total Students',
      value: 1248,
      change: 12,
      icon: 'pi-users',
      color: 'text-blue-600',
      bgColor: 'bg-blue-500'
    },
    {
      title: 'Total Teachers',
      value: 84,
      change: 3,
      icon: 'pi-user',
      color: 'text-purple-600',
      bgColor: 'bg-purple-500'
    },
    {
      title: 'Total Classes',
      value: 48,
      change: 5,
      icon: 'pi-book',
      color: 'text-green-600',
      bgColor: 'bg-green-500'
    },
    {
      title: 'Attendance Rate',
      value: '94.5%',
      change: 2.5,
      icon: 'pi-calendar',
      color: 'text-orange-600',
      bgColor: 'bg-orange-500'
    }
  ];

  // Chart Data
  attendanceChartData: any;
  attendanceChartOptions: any;

  gradeChartData: any;
  gradeChartOptions: any;

  // Recent Activities
  recentActivities: any[] = [
    {
      id: 1,
      user: 'Emma Thompson',
      action: 'submitted assignment for Mathematics',
      time: '5 minutes ago',
      icon: 'pi-file',
      iconColor: 'bg-blue-100 text-blue-600'
    },
    {
      id: 2,
      user: 'Dr. Sarah Johnson',
      action: 'uploaded new course material',
      time: '15 minutes ago',
      icon: 'pi-upload',
      iconColor: 'bg-purple-100 text-purple-600'
    },
    {
      id: 3,
      user: 'Liam Chen',
      action: 'registered for Physics Lab',
      time: '1 hour ago',
      icon: 'pi-check-circle',
      iconColor: 'bg-green-100 text-green-600'
    },
    {
      id: 4,
      user: 'Prof. Michael Chen',
      action: 'scheduled exam for next week',
      time: '2 hours ago',
      icon: 'pi-calendar',
      iconColor: 'bg-orange-100 text-orange-600'
    },
    {
      id: 5,
      user: 'Sophia Rodriguez',
      action: 'achieved perfect attendance',
      time: '3 hours ago',
      icon: 'pi-star-fill',
      iconColor: 'bg-amber-100 text-amber-600'
    }
  ];

  // Upcoming Events
  upcomingEvents: any[] = [
    {
      id: 1,
      title: 'Mid-Term Examinations',
      date: 'Nov 15, 2024',
      time: '9:00 AM',
      type: 'Exam',
      color: 'bg-red-500'
    },
    {
      id: 2,
      title: 'Parent-Teacher Meeting',
      date: 'Nov 18, 2024',
      time: '2:00 PM',
      type: 'Meeting',
      color: 'bg-blue-500'
    },
    {
      id: 3,
      title: 'Science Fair',
      date: 'Nov 22, 2024',
      time: '10:00 AM',
      type: 'Event',
      color: 'bg-green-500'
    },
    {
      id: 4,
      title: 'Sports Day',
      date: 'Nov 25, 2024',
      time: '8:00 AM',
      type: 'Event',
      color: 'bg-orange-500'
    }
  ];

  // Top Students
  topStudents: TopStudent[] = [
    {
      id: 1,
      name: 'Noah Williams',
      grade: '12th Grade',
      gpa: 4.0,
      avatar: 'NW',
      color: 'bg-blue-500'
    },
    {
      id: 2,
      name: 'Liam Chen',
      grade: '11th Grade',
      gpa: 3.9,
      avatar: 'LC',
      color: 'bg-purple-500'
    },
    {
      id: 3,
      name: 'Emma Thompson',
      grade: '10th Grade',
      gpa: 3.8,
      avatar: 'ET',
      color: 'bg-pink-500'
    }
  ];

  ngOnInit(): void {
    this.initializeCharts();
  }

  initializeCharts(): void {
    // Attendance Chart
    this.attendanceChartData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [
        {
          label: 'Attendance Rate',
          data: [95, 92, 96, 94, 93, 91],
          fill: true,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          tension: 0.4
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
          beginAtZero: false,
          min: 85,
          max: 100
        }
      }
    };

    // Grade Distribution Chart
    this.gradeChartData = {
      labels: ['A', 'B', 'C', 'D', 'F'],
      datasets: [
        {
          data: [35, 30, 20, 10, 5],
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

    this.gradeChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom'
        }
      }
    };
  }

  getChangeClass(change: number): string {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  }

  getChangeIcon(change: number): string {
    return change >= 0 ? 'pi-arrow-up' : 'pi-arrow-down';
  }

}
