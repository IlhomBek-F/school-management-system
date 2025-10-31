import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TagModule } from "primeng/tag";
import { ChartModule } from "primeng/chart";

@Component({
  selector: 'school-overview',
  imports: [TagModule, ChartModule],
  templateUrl: './overview.component.html',
  styles: `
     :host {
    display: block
     }
   `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OverviewComponent {
  teacher = input.required<any>()
  performanceChartData = input.required<any>()
  performanceChartOptions = input.required<any>()
}
