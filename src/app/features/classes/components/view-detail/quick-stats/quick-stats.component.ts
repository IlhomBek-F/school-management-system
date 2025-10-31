import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SkeletonModule } from "primeng/skeleton";

@Component({
  selector: 'school-quick-stats',
  imports: [SkeletonModule, CommonModule],
  templateUrl: './quick-stats.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuickStatsComponent {
  loading = input(false)
}
