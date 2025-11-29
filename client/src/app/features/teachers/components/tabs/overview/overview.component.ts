import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TagModule } from "primeng/tag";
import { ChartModule } from "primeng/chart";
import { SkeletonModule } from "primeng/skeleton";
import { CommonModule } from '@angular/common';
import { Teacher } from 'app/features/teachers/models';

@Component({
  selector: 'school-overview',
  imports: [TagModule, ChartModule, SkeletonModule, CommonModule],
  templateUrl: './overview.component.html',
  styles: `
     :host {
    display: block
     }
   `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  teacher = input.required<Teacher>()
  performanceChartData = input.required<any>()
  performanceChartOptions = input.required<any>()
  loading = input(false)
}
