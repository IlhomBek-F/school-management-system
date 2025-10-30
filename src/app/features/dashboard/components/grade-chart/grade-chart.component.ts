import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { ChartModule } from "primeng/chart";

@Component({
  selector: 'school-dashboard-grade-chart',
  imports: [ButtonModule, ChartModule],
  templateUrl: './grade-chart.component.html',
  styleUrl: './grade-chart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardGradeChartComponent {
  gradeChartData = input.required<any>()
  gradeChartOptions = input.required<any>()
}
