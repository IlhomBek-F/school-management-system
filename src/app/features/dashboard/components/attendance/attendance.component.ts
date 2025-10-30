import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { ChartModule } from "primeng/chart";

@Component({
  selector: 'school-dashboard-attendance',
  imports: [ButtonModule, ChartModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardAttendanceComponent {
  attendanceChartData = input.required<any>()
  attendanceChartOptions = input.required<any>()
}
