import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TagModule } from "primeng/tag";
import { ChartModule } from "primeng/chart";

@Component({
  selector: 'school-attendance',
  imports: [TagModule, ChartModule],
  templateUrl: './attendance.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AttendanceComponent {
  recentAttendance = input.required<any>()
  attendanceChartData = input.required<any>()
  attendanceChartOptions = input.required<any>()
}
