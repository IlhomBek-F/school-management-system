import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChartModule } from "primeng/chart";
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'school-overview',
  imports: [CommonModule, ChartModule, SkeletonModule],
  templateUrl: './overview.component.html',
  styles: `:host {
    display: block
  }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  student = input.required<any>()
  performanceChartData = input.required<any>()
  performanceChartOptions = input.required<any>()
  loading = input(false)
}
