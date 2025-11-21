import { ChangeDetectionStrategy, Component, inject, signal, WritableSignal } from '@angular/core';
import { TagModule } from "primeng/tag";
import { ChartModule } from "primeng/chart";
import { ButtonModule } from "primeng/button";
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, RouterLink } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { OverviewComponent } from '../../components/tabs/overview/overview.component';
import { SubjectsComponent } from '../../components/tabs/subjects/subjects.component';
import { AttendanceComponent } from '../../components/tabs/attendance/attendance.component';
import { ActivityComponent } from '../../components/tabs/activity/activity.component';
import { StudentViewDetailHeaderComponent } from "../../components/view-detail/student-view-detail-header/student-view-detail-header.component";
import { TabViewModule } from "primeng/tabview";
import { BreadcrumbComponent } from "@shared/components/breadcrumb/breadcrumb.component";
import { finalize, switchMap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { StudentsService } from '../../services/students.service';
import { ToastService } from '@core/services/toast.service';
import { Student, StudentSuccessRes } from '../../models';

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

@UntilDestroy()
@Component({
  selector: 'school-student-view-profile',
  imports: [TagModule, ChartModule, ButtonModule, CommonModule, OverviewComponent, SubjectsComponent, AttendanceComponent, ActivityComponent, StudentViewDetailHeaderComponent, TabViewModule, BreadcrumbComponent],
  templateUrl: './student-view-profile.component.html',
  styleUrl: './student-view-profile.component.scss',
  providers: [DialogService, StudentsService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentViewProfileComponent {
  activeIndex: number = 0;
  loading = signal(false)

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


  student: WritableSignal<Student> = signal({} as Student)

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

  private _activeRoute = inject(ActivatedRoute)
  private _studentsService = inject(StudentsService)
  private _messageService = inject(ToastService)
  // Chart Data
  performanceChartData: any;
  performanceChartOptions: any;

  attendanceChartData: any;
  attendanceChartOptions: any;

  ngOnInit(): void {
    this.initializeCharts();
    this._getStudentDetail()
  }

  private _getStudentDetail() {
    this._activeRoute.paramMap
    .pipe(
      switchMap((p: ParamMap) => {
          this.loading.set(true)
          const studentId = p.get("student_id") as string

          return this._studentsService.retrieveById<StudentSuccessRes>(+studentId)
        }),
        untilDestroyed(this)
      )
      .subscribe({
        next: (res) => {
          this.student.set(res.data)
          this.loading.set(false)
        }, error: (err) => {
          this.loading.set(false)
          this._messageService.error("Error getting student by id")
        }
      })
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
}
