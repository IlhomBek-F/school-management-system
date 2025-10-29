import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChartModule } from "primeng/chart";

@Component({
  selector: 'school-overview',
  imports: [CommonModule, ChartModule],
  templateUrl: './overview.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  student = input.required<any>()
  performanceChartData = input.required<any>()
  performanceChartOptions = input.required<any>()
}
